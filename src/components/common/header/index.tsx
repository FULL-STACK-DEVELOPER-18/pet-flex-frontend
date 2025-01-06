import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { useEffect } from 'react';
import './index.scss';
const { Header } = Layout;
interface HeaderComponentProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const HeaderComponent = ({ setCollapsed, collapsed,}: HeaderComponentProps) => {

  useEffect(() => {
    document.body.className = "light";
  }, []);

  return (
    <Header>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
    </Header>
  );
};
