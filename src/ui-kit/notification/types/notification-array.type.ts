export interface NotificationArrayType {
  status: 'error' | 'warning' | 'success';
  operation: string;
  text?: string;
}
