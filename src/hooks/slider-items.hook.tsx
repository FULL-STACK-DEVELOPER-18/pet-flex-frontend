import React from 'react';
import { LogoutOutlined, DashboardOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { routeConstant } from '../constants/routes';
import type { MenuProps } from 'antd';
import { removeLocalStorageItem } from '../utils/local-storage';
// import { ClientPetImage, ProgramImage } from '../assets/svg-images';
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

  const items: MenuItem[] = [
    // getItem('Home', 'initialHome', <DashboardOutlined />, () =>
    //   navigate(routeConstant.app.initialHome.path),
    // ),
    getItem('Clients Pets', 'clientPets', <DashboardOutlined />, () =>
      navigate(routeConstant.app.clientPets.path),
    ),
    getItem('Calendar', 'calendar', <DashboardOutlined />, () =>
      navigate(routeConstant.app.calendar.path),
    ),
    getItem('Programs', 'programs', <DashboardOutlined />, () =>
      navigate(routeConstant.app.programs.path),
    ),
    getItem('Inbox', 'inbox', <DashboardOutlined />, () =>
      navigate(routeConstant.app.inbox.path),
    ),
    getItem('Community Blog', 'blogs', <DashboardOutlined />, () =>
      navigate(routeConstant.app.blogs.path),
    ),
    getItem('Payment', 'payment', <DashboardOutlined />, () =>
      navigate(routeConstant.app.payment.path),
    ),
    getItem('Referral Programs', 'referral', <DashboardOutlined />, () =>
      navigate(routeConstant.app.referral.path),
    ),
    getItem('Teammates', 'teammates', <DashboardOutlined />, () =>
      navigate(routeConstant.app.teammates.path),
    ),
    getItem('Acount Details', 'profile', <DashboardOutlined />, () =>
      navigate(routeConstant.app.profile.path),
    ),
    getItem('Billing', 'billing', <DashboardOutlined />, () =>
      navigate(routeConstant.app.billing.path),
    ),
    // getItem('Setting', 'settings', <SettingOutlined />, undefined, [
    //   getItem('Change Password', 'changePassword', undefined, () =>
    //     navigate(routeConstant.app.changePassword.path),
    //   ),
    //   getItem('Email Template', 'emailTemplate', undefined, () =>
    //     navigate(routeConstant.app.emailTemplate.path),
    //   ),
    //   getItem('Change Theme', 'change_theme', undefined, () =>
    //     navigate(routeConstant.app.change_theme.path),
    //   ),
    // ]),
    getItem('Logout', 'logout', <LogoutOutlined />, onClickLogout),
  ];

  return items;
};
