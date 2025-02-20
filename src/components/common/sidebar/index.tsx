import { Layout, Menu } from 'antd';
import { routeConstant } from '../../../constants/routes';
import { useSidebarItems } from '../../../hooks/slider-items.hook';
import { CopyOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
const { Sider } = Layout;

import './sidebar.scss';
import { PaymentPetflexClapIcon, PetFlexLogo } from '../../../assets/svg-images';

interface SidebarComponentProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const SidebarComponent = ({
  collapsed,
  setCollapsed,
}: SidebarComponentProps) => {
  const menuItems = useSidebarItems();
  const [inviteLink] = useState('Invite.54fdf5ddl....');

  // Mock user data - replace with actual user data from your auth context/store
  const user = {
    name: 'Edwards Jones',
    role: 'Manager',
    avatar: null
  };

  // Find a matching route in the routeConstant object
  const matchingRoute = Object.values(routeConstant.app).find(
    (route) => route.path === window.location.pathname,
  );

  const onCloseSideBar = () => {
    if (window.innerWidth <= 767) {
      setCollapsed(true);
    }
  };

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(inviteLink);
    // You can add a notification here to show "Copied!" message
  };

  return (
    <div className={`sidebar-menu ${collapsed ? 'close_sidebar' : 'open_sidebar'}`}>
      <Sider 
        width={250} 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        collapsedWidth={75} 
        className='sidebarr'
      >
        <div className="logo">
          {!collapsed ? <PetFlexLogo /> : <PaymentPetflexClapIcon />}
          {window.innerWidth <= 767 && !collapsed && (
            <div className="close-icon" onClick={() => setCollapsed(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 30 30"
              >
                <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
              </svg>
            </div>
          )}
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[matchingRoute?.id || '']}
          items={menuItems}
          onClick={onCloseSideBar}
        />

        {!collapsed && (
          <div className="user-profile-section">
            <div className="user-info">
              <div className="avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <UserOutlined />
                )}
              </div>
              <div className="user-details">
                <div className="name">{user.name}</div>
                <div className="role">{user.role}</div>
              </div>
            </div>
            
            <div className="invite-link">
              <span>{inviteLink}</span>
              <CopyOutlined className="copy-icon" onClick={handleCopyInvite} />
            </div>
          </div>
        )}
      </Sider>
    </div>
  );
};