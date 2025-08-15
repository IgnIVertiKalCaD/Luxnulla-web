import { Component, Input, OnInit, inject } from '@angular/core';
import {NgIf} from "@angular/common";
import {IconComponent} from "@/components/icon/icon.component";
import {NotificationContainerService} from "@/ui-kit/notification/notification-container.service";
import {NotificationArrayType} from "@/ui-kit/notification/types/notification-array.type";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  imports: [
    NgIf,
    IconComponent
  ],
  standalone: true
})
export class NotificationComponent implements OnInit {
  private readonly notificationsService = inject(NotificationContainerService);


  @Input()
  idx: number;

  @Input()
  data: NotificationArrayType;

  @Input()
  time: number = 5; // seconds

  closeNotification() {
    this.notificationsService.removeNotification(this.idx)
  }

  ngOnInit() {
    setTimeout(() => {
      this.closeNotification()
    }, this.time * 1000)
  }
}
