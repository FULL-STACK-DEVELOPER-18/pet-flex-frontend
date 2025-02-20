import { Tabs, Form, Input, Button, DatePicker, Radio, Row, Col, Spin, Result } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './style.scss';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ShowNotification } from '../../utils/notification';
import { changePassword } from '../../redux/actions/auth.action';
import { Validation } from '../../constants/validations';
import { fetchUserProfile, updateUserProfile } from '../../redux/actions/user.action';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const { TabPane } = Tabs;

export const Profile = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data: profileData, isLoading, error, refetch } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
  });

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: updateUserProfile,
    onSuccess: () => {
      ShowNotification({
        message: 'Profile updated successfully!',
        type: 'success',
      });
      refetch();
    },
    onError: (error: any) => {
      ShowNotification({
        message: error?.response?.data?.message || 'Failed to update profile!',
        type: 'error',
      });
    },
  });

  const { mutate: changePass, isPending: isChangingPassword } = useMutation({
    mutationKey: ['changePassword'],
    mutationFn: changePassword,
    onSuccess: () => {
      ShowNotification({
        message: 'Password changed successfully!',
        type: 'success',
      });
    },
    onError: (error: any) => {
      ShowNotification({
        message: error?.response?.data?.message || 'Something went wrong!',
        type: 'error',
      });
    },
  });

  const handleProfileSubmit = (values: any) => {
    const formattedValues = {
      ...values,
      dateOfBirth: values.dateOfBirth ? values.dateOfBirth.toISOString() : null
    };
    updateProfile(formattedValues);
  };

  const handlePasswordSubmit = (values: any) => {
    const updatedData = {
      email: profileData?.email,
      currentPassword: values?.currentPassword,
      newPassword: values?.newPassword,
    };
    changePass(updatedData);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  if (error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}
      />
    );
  }

  return (
    <div className="main-table">
      <div className="profile-container">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Profile" key="1">
            <Form 
              form={form} 
              layout="vertical" 
              onFinish={handleProfileSubmit}
              initialValues={{
                ...profileData,
                dateOfBirth: profileData?.dateOfBirth ? dayjs(profileData.dateOfBirth) : null
              }}
              className="profile-form"
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item 
                    label="First Name" 
                    name="firstName" 
                    rules={[{ required: true, message: 'Please enter your first name!' }]}
                  >
                    <Input placeholder="Enter your first name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item 
                    label="Last Name" 
                    name="lastName" 
                    rules={[{ required: true, message: 'Please enter your last name!' }]}
                  >
                    <Input placeholder="Enter your last name" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="Date Of Birth" name="dateOfBirth">
                    <DatePicker style={{ width: '100%' }} placeholder="Select date of birth" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item 
                    label="Phone Number" 
                    name="phoneNumber" 
                    rules={Validation('phoneNumber')}
                  >
                    <Input placeholder="Enter your phone number" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item 
                label="Email" 
                name="email" 
                rules={Validation('email')}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item label="Gender" name="gender">
                <Radio.Group>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={isUpdating}
                  className="submit-button"
                >
                  Update Profile
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Change Password" key="2">
            <div className="password-container">
              <Form 
                layout="vertical" 
                onFinish={handlePasswordSubmit}
                className="password-form"
              >
                <Form.Item 
                  label="Current Password" 
                  name="currentPassword" 
                  rules={Validation("password")}
                >
                  <Input.Password className="custom-input" placeholder="Enter current password" />
                </Form.Item>

                <Form.Item 
                  label="New Password" 
                  name="newPassword" 
                  rules={Validation("password")}
                >
                  <Input.Password className="custom-input" placeholder="Enter new password" />
                </Form.Item>

                <Form.Item 
                  label="Confirm Password" 
                  name="confirmPassword" 
                  rules={Validation("confirmPassword")}
                >
                  <Input.Password className="custom-input" placeholder="Confirm new password" />
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={isChangingPassword}
                    className="submit-button"
                  >
                    Change Password
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};