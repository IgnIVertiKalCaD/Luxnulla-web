import { Component, inject } from '@angular/core';
import {NotificationArrayType} from "@/ui-kit/notification/types/notification-array.type";
import {AsyncPipe, NgForOf} from "@angular/common";
import {NotificationComponent} from "@/ui-kit/notification/notification.component";
import {NotificationContainerService} from "@/ui-kit/notification/notification-container.service";
import {Observable} from "rxjs";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-notification-container',
  templateUrl: './notification-container.component.html',
  styleUrls: ['./notification-container.component.scss'],
  imports: [
    NgForOf,
    NotificationComponent,
    AsyncPipe
  ],
  animations: [
    trigger('notificationAnimation', [
      transition(':enter', [
        style({height: 0, padding: '0 32px', opacity: 0, overflow: 'hidden'}),
        animate('300ms ease-out', style({height: '*', padding: '32px', opacity: 1})),
      ]),
      transition(':leave', [
        style({opacity: 1, overflow: 'hidden'}),
        animate('250ms ease-in', style({height: '50px', opacity: 0, transform: 'rotateX(90deg)'})),
      ]),
    ]),
  ],
  standalone: true
})
export class NotificationContainerComponent {
  private readonly notificationsService = inject(NotificationContainerService);


  trackById(index: number, item: any) {
    return item;
  }

  notifications: Observable<NotificationArrayType[]> = this.notificationsService.selectNotifications()
}
