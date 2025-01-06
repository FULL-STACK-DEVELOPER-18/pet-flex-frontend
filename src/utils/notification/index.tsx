import { notification } from 'antd';
import { NotificationProps } from '../../interfaces/utils/notification/notification.interfaces';

export const ShowNotification: React.FC<NotificationProps> = ({
  message,
  type = 'info',
  placement = 'topRight',
  duration = 3,
  description = '',
}) => {
  if (!notification[type]) {
    console.error(`Invalid notification type: ${type}`);
    return null;
  }

  notification[type]({ message, placement, duration, description });
  return null;
};
