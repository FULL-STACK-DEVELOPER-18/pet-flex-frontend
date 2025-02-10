import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, BellFilled } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { useEffect } from 'react';
import './index.scss';
import { CrownIcon } from '../../../assets/svg-images';
const { Header } = Layout;

interface HeaderComponentProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const HeaderComponent = ({ setCollapsed, collapsed }: HeaderComponentProps) => {

  useEffect(() => {
    document.body.className = "light";
  }, []);

  return (
    <Header className='top-header'>
      <div className='header-content'>
        <div className='left-content'>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className='collapsed-button'
          />
          <span className='clients-text'>All Clients (2)</span>
        </div>
        <div className='right-content'>
          <Button className='upgrade-button'>
            UPGRADE <CrownIcon/>
          </Button>
          <SearchOutlined className='icon' />
          <BellFilled className='icon' />
        </div>
      </div>
    </Header>
  );
};