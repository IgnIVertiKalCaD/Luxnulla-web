/* carousel.component.ts */
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, Renderer2, ViewChild, inject } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  private rd = inject(Renderer2);
  private zone = inject(NgZone);


  /* template ref на бегущую ленту */
  @ViewChild('track', { static: true }) trackRef!: ElementRef<HTMLElement>;

  /* размеры / счётчики */
  private slideW = 0;
  private slideCnt = 0;
  private cloneCnt = 0;

  /* drag-state */
  private startX = 0;
  private cur = 0;
  private prev = 0;
  private dragging = false;

  /* отписки */
  private offMove!: () => void;
  private offUp!: () => void;
  private ro?: ResizeObserver;

  /* ---------- life-cycle ---------- */
  ngAfterViewInit() { requestAnimationFrame(() => this.init()); }
  ngOnDestroy()      { this.offMove?.(); this.offUp?.(); this.ro?.disconnect(); }

  /* ---------- init ---------- */
  private init() {
    const track  = this.trackRef.nativeElement;
    const slides = Array.from(track.children) as HTMLElement[];
    if (!slides.length) return;

    /* ширина слайда + spacing */
    const mr = parseFloat(getComputedStyle(slides[0]).marginRight) || 0;
    this.slideW  = slides[0].offsetWidth + mr;
    this.slideCnt = slides.length;

    /* клонируем столько, чтобы заполнить экран */
    const vpW = track.parentElement!.offsetWidth;
    this.cloneCnt = Math.ceil(vpW / this.slideW) + 1;
    this.clone(track, slides);

    this.recenter();   // первый translate

    /* listeners вне Angular-зоны */
    this.zone.runOutsideAngular(() => {
      this.rd.listen(track, 'mousedown', e => this.onDown(e));
      this.offMove = this.rd.listen('window', 'mousemove', e => this.onMove(e));
      this.offUp   = this.rd.listen('window', 'mouseup',   () => this.onUp());
    });

    /* пересчёт при resize */
    this.ro = new ResizeObserver(() => { this.onResize(); });
    this.ro.observe(track.parentElement!);
  }

  /* ---------- clone & recalc ---------- */
  private clone(track: HTMLElement, src: HTMLElement[]) {
    const head = src.slice(-this.cloneCnt).map(n => n.cloneNode(true));
    const tail = src.slice(0, this.cloneCnt).map(n => n.cloneNode(true));
    head.forEach(n => this.rd.insertBefore(track, n, track.firstChild));
    tail.forEach(n => this.rd.appendChild(track, n));
  }

  private recenter() {
    const vpW = this.trackRef.nativeElement.parentElement!.offsetWidth;
    const center = (vpW - this.slideW) / 2;
    const base   = -this.cloneCnt * this.slideW + center;
    this.prev = this.cur = base;
    this.setT('none');
    this.setX(base);
  }

  /* ---------- drag-handlers ---------- */
  private onDown(e: MouseEvent) {
    e.preventDefault();
    this.dragging = true;
    this.startX   = e.clientX;
    this.setT('none');
  }

  private onMove(e: MouseEvent) {
    if (!this.dragging) return;
    this.cur = this.prev + (e.clientX - this.startX);
    this.setX(this.cur);         // ⚠️ без жёстких clamp'ов
  }

  private onUp() {
    if (!this.dragging) return;
    this.dragging = false;
    this.snap();
  }

  /* ---------- snap ---------- */
  private snap() {
    const vpW   = this.trackRef.nativeElement.parentElement!.offsetWidth;
    const cOff  = (vpW - this.slideW) / 2;
    const idx   = Math.round((-this.cur + cOff) / this.slideW);
    const real  = ((idx % this.slideCnt) + this.slideCnt) % this.slideCnt;
    const vis   = real + this.cloneCnt;
    const tgt   = -vis * this.slideW + cOff;

    this.setT('transform .35s ease');
    this.setX(tgt);
    this.prev = this.cur = tgt;

    /* телепорт внутрь «центра» через 350 мс */
    setTimeout(() => {
      const base = - (this.cloneCnt + real) * this.slideW + cOff;
      this.setT('none');
      this.setX(base);
      this.prev = this.cur = base;
    }, 360);
  }

  /* ---------- resize ---------- */
  private onResize() {
    /* пересчитать ширину */
    const first = this.trackRef.nativeElement.querySelector('.slide') as HTMLElement;
    if (!first) return;
    const mr = parseFloat(getComputedStyle(first).marginRight) || 0;
    this.slideW = first.offsetWidth + mr;
    this.recenter();
  }

  /* ---------- dom helpers ---------- */
  private setX(x: number)      { this.rd.setStyle(this.trackRef.nativeElement, 'transform', `translateX(${x}px)`); }
  private setT(t: string)      { this.rd.setStyle(this.trackRef.nativeElement, 'transition', t); }
}
