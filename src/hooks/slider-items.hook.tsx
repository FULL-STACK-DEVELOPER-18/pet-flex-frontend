import React from 'react';
import { LogoutOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { routeConstant } from '../constants/routes';
import type { MenuProps } from 'antd';
import { removeLocalStorageItem } from '../utils/local-storage';
import accountIcon from '../assets/png-images/account-detail-icon.png';
import billingIcon from '../assets/png-images/billing-icon.png';
import clientPetsIcon from '../assets/png-images/client-pet-icon.png';
import communityBlogIcon from '../assets/png-images/community-blog-icon.png';
import exerciseIcon from '../assets/png-images/exerciseIcon.png';
import inboxIcon from '../assets/png-images/inbox-icon.png';
import paymentIcon from '../assets/png-images/payment-icon.png';
import programsIcon from '../assets/png-images/program-icon.png';
import referralIcon from '../assets/png-images/referral-icon.png';
import teammatesIcon from '../assets/png-images/teammates-icon.png';
// import { logoutUser } from '../redux/actions/authentication/auth';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  onClick?: () => void,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  } as MenuItem;
}

export const useSidebarItems = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    // logoutUser().then(() => {
      removeLocalStorageItem('token');
      navigate(routeConstant.app.login.path);
    // });
  };

  const PngIcon = ({ src }: { src: string }) => (
    <span className="custom-menu-icon">
      <img src={src} alt="menu icon" />
    </span>
  );

  const items: MenuItem[] = [
    getItem('Clients Pets', 'clientPets', <PngIcon src={clientPetsIcon} />, () =>
      navigate(routeConstant.app.clientPets.path),
    ),
    getItem('Calendar', 'calendar', <CalendarOutlined />, () =>
      navigate(routeConstant.app.calendar.path),
    ),
    getItem('Exercises', 'exercises',  <PngIcon src={exerciseIcon} />, () =>
      navigate(routeConstant.app.exercises.path),
    ),
    getItem('Programs', 'programs', <PngIcon src={programsIcon} />, () =>
      navigate(routeConstant.app.programs.path),
    ),
    getItem('Inbox', 'inbox', <PngIcon src={inboxIcon} />, () =>
      navigate(routeConstant.app.inbox.path),
    ),
    getItem('Community Blog', 'blogs', <PngIcon src={communityBlogIcon} />, () =>
      navigate(routeConstant.app.blogs.path),
    ),
    getItem('Payment', 'payment', <PngIcon src={paymentIcon} />, () =>
      navigate(routeConstant.app.payment.path),
    ),
    getItem('Referral Programs', 'referral', <PngIcon src={referralIcon} />, () =>
      navigate(routeConstant.app.referral.path),
    ),
    getItem('Teammates', 'teammates', <PngIcon src={teammatesIcon} />, () =>
      navigate(routeConstant.app.teammates.path),
    ),
    getItem('Acount Details', 'profile', <PngIcon src={accountIcon} />, () =>
      navigate(routeConstant.app.profile.path),
    ),
    getItem('Billing', 'billing', <PngIcon src={billingIcon} />, () =>
      navigate(routeConstant.app.billing.path),
    ),
    getItem('Logout', 'logout', <LogoutOutlined />, onClickLogout),
  ];

  return items;
};
