export interface NotificationProps {
  message: string | '';
  type?: 'success' | 'info' | 'warning' | 'error';
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  duration?: number;
  description?: string | '';
}
