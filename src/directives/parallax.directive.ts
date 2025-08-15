import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2, HostBinding, booleanAttribute, HostListener, Injectable, afterNextRender, inject } from "@angular/core";
import {Subject, Subscription, fromEvent, takeUntil} from "rxjs";
import {WindowService} from "@/services/window.service";

@Injectable({
  providedIn: "root",
})
export class MousePositionService {
  private readonly windowService = inject(WindowService);

  private _mouseX: number = 0;
  private _mouseY: number = 0;
  private _coordinatesCaptured: boolean = false;
  private mouseMoveSubscription: Subscription;
  private destroy$ = new Subject<void>();

  private mouseMoveSubject = new Subject<{ x: number; y: number }>();

  constructor() {
    if (!this.windowService.isClient()) return

    this.mouseMoveSubscription = fromEvent(document, "click")
      .pipe(takeUntil(this.destroy$)) // Отписка при уничтожении сервиса
      .subscribe((event: Event) => {
        const mouseEvent = event as MouseEvent;
        this._mouseX = mouseEvent.clientX;
        this._mouseY = mouseEvent.clientY;
        this._coordinatesCaptured = true;
        this.mouseMoveSubject.next({x: this._mouseX, y: this._mouseY}); // Извещаем подписчиков
      });
  }

  get mouseX(): number {
    return this._mouseX;
  }

  get mouseY(): number {
    return this._mouseY;
  }

  get coordinatesCaptured(): boolean {
    return this._coordinatesCaptured;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Directive({
  selector: "[appParallax]",
  standalone: true,
})
export class ParallaxDirective implements OnInit, OnDestroy {
  private readonly elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly mousePositionService = inject(MousePositionService);
  private readonly windowService = inject(WindowService);

  @Input("appParallax") parallaxRatio: number = 0.1;
  @Input({transform: booleanAttribute}) invertX: boolean = false;
  @Input({transform: booleanAttribute}) invertY: boolean = false;
  @HostBinding("style.transition") private transition: string = "";

  private static activeInstances = 0; // Счетчик видимых элементов
  private static activeMouseMoveSubscription: Subscription | null = null;
  private static mouseX = 0;
  private static mouseY = 0;
  private static mouseMoveSubscription: Subscription | null = null;

  private observer!: IntersectionObserver;
  private animationFrameId: number | null = null;
  private currentX = 0;
  private currentY = 0;
  private isVisible = false;

  constructor() {
    afterNextRender(() => {
      this.setupIntersectionObserver();
    })
  }

  ngOnInit(): void {

  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          this.startEffect();
        } else if (this.isVisible) {
          this.isVisible = false;
          this.stopEffect();
        }
      });
    });
    this.observer.observe(this.elRef.nativeElement);
  }

  private startEffect(): void {
    ParallaxDirective.activeInstances++;
    // Запускаем глобальный слушатель только для первого видимого элемента
    if (ParallaxDirective.activeInstances === 1) {
      ParallaxDirective.mouseMoveSubscription = fromEvent<MouseEvent>(
        window,
        "mousemove",
      ).subscribe((event) => {
        ParallaxDirective.mouseX = event.clientX;
        ParallaxDirective.mouseY = event.clientY;
      });
    }
    this.runAnimation();
  }

  private stopEffect(): void {
    ParallaxDirective.activeInstances--;
    // Останавливаем глобальный слушатель, когда не осталось видимых элементов
    if (ParallaxDirective.activeInstances === 0) {
      ParallaxDirective.mouseMoveSubscription?.unsubscribe();
      ParallaxDirective.mouseMoveSubscription = null;
    }
    this.cancelAnimation();
  }

  private runAnimation(): void {
    if (this.animationFrameId) return;

    // Мгновенно устанавливаем позицию элемента при появлении
    this.updatePosition(true);

    // Включаем плавность для последующих движений
    setTimeout(() => {
      this.transition = "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

      // Запускаем цикл плавной анимации
      const animationLoop = () => {
        this.updatePosition(false);
        this.animationFrameId = requestAnimationFrame(animationLoop);
      };
      this.animationFrameId = requestAnimationFrame(animationLoop);
    }, 0);
  }

  private cancelAnimation(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.renderer.setStyle(this.elRef.nativeElement, "transition", "");
    this.renderer.setStyle(
      this.elRef.nativeElement,
      "transform",
      "translate3d(0, 0, 0)",
    );
  }

  /**
   * Основная логика расчета и применения позиции
   * @param isInitial - если true, позиция применяется мгновенно, иначе плавно
   */
  private updatePosition(isInitial: boolean): void {
    const centerX = this.mousePositionService.mouseX ?? window.innerWidth / 2;
    const centerY = this.mousePositionService.mouseY ?? window.innerHeight / 2;
    const inversionX = this.invertX ? -1 : 1;
    const inversionY = this.invertY ? -1 : 1;

    // Целевая позиция на основе глобальных координат мыши
    const targetX =
      (ParallaxDirective.mouseX - centerX) * inversionX * this.parallaxRatio;
    const targetY =
      (ParallaxDirective.mouseY - centerY) * inversionY * this.parallaxRatio;

    if (isInitial) {
      this.currentX = targetX;
      this.currentY = targetY;
    } else {
      // Корректная формула для плавной анимации (LERP)
      this.currentX += (targetX - this.currentX) * 0.1;
      this.currentY += (targetY - this.currentY) * 0.1;
    }

    const transform = `translate3d(${this.currentX.toFixed(2)}px, ${this.currentY.toFixed(2)}px, 0)`;
    this.renderer.setStyle(this.elRef.nativeElement, "transform", transform);
  }

  ngOnDestroy(): void {
    if (this.windowService.isClient()) {
      this.observer.disconnect();
    }

    if (this.isVisible) {
      this.stopEffect();
    }
  }
}
