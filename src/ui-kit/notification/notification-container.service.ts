import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {NotificationArrayType} from "@/ui-kit/notification/types/notification-array.type";

@Injectable({
  providedIn: 'root'
})
export class NotificationContainerService {

  constructor() {
  }

  private notificationsSubject: BehaviorSubject<NotificationArrayType[]> =
    new BehaviorSubject<NotificationArrayType[]>([]);
  private notifications$: Observable<NotificationArrayType[]> =
    this.notificationsSubject.asObservable();


  addNotification(notification: NotificationArrayType) {
    const data = this.notificationsSubject.getValue()

    data.push(notification)

    this.notificationsSubject.next(data)
  }

  removeNotification(idx: number) {
    const data = this.notificationsSubject.getValue()

    data.splice(idx, 1)

    this.notificationsSubject.next(data)
  }

  selectNotifications() {
    return this.notifications$;
  }
}


