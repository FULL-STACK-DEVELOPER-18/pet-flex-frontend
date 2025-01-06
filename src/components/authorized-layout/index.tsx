import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { SidebarComponent } from '../common/sidebar';
import { HeaderComponent } from '../common/header';
import { useState } from 'react';
import { getLocalStorageItem } from '../../utils/local-storage';
import { routeConstant } from '../../constants/routes';
export const AuthorizedLayout = () => {
  const { Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const token = getLocalStorageItem('token');

  //if not token then redirect to login page
  if (!token) {
    return <Navigate to={routeConstant.app.login.path} />;
  }

  return (
    <Layout>
      <SidebarComponent collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
