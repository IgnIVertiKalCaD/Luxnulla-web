import {Overlay, OverlayPositionBuilder, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import { Injectable, Injector, inject } from "@angular/core";
import {NotificationContainerComponent} from "@/ui-kit/notification/notification-container.component";

@Injectable({
  providedIn: 'root'
})
export class OverlayNotificationService {
  private overlay = inject(Overlay);
  private injector = inject(Injector);
  private positionBuilder = inject(OverlayPositionBuilder);

  private overlayRef: OverlayRef | null = null;

  create(): void {
    // Создаем оверлей для уведомлений
    const positionStrategy = this.positionBuilder
      .global()

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: false, // Убираем фон
    });

    // Монтируем компонент с уведомлением
    const notificationPortal = new ComponentPortal(NotificationContainerComponent, null, this.injector);
    this.overlayRef.attach(notificationPortal);

    // Закрываем оверлей при нажатии на фон
    // this.overlayRef..subscribe(() => this.close());
  }

  close(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
