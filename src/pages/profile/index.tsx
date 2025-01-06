import { Tabs, Form, Input, Button, DatePicker, Radio, Row, Col, Spin, Result } from 'antd';
import './style.scss';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ShowNotification } from '../../utils/notification';
import { changePassword } from '../../redux/actions/auth.action';
import { Validation } from '../../constants/validations';
import { LoadingOutlined } from '@ant-design/icons';
import { fetchUserProfile } from '../../redux/actions/user.action';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

export const Profile = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data: profileData, isLoading, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
  });

  console.log(profileData);

  const { mutate, isPending } = useMutation({
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
    console.log('Profile Data:', values);
  };

  const handlePasswordSubmit = (values: any) => {
    const updatedData = {
      email: profileData?.email,
      currentPassword: values?.currentPassword,
      newPassword: values?.newPassword,
    };
    mutate(updatedData);
  };

  if (isLoading) {
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    )
  }
  
  if (error) {
    return (
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
          extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}
        />
    )
  }

  return (
    <div className="main-table">
      <div className="profile-container">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Profile" key="1">
          <Form form={form} layout="vertical" onFinish={handleProfileSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter your first name!' }]}>
                  <Input placeholder="Type here" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter your last name!' }]}>
                  <Input placeholder="Type here" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Date Of Birth" name="dob">
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: 'Please enter your phone number!' }]}>
                  <Input placeholder="Type here" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}>
              <Input placeholder="Type here" />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Save</Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Change Password" key="2">
          <Form layout="vertical" onFinish={handlePasswordSubmit}>
            <Form.Item label="Current Password" name="currentPassword" rules={Validation("password")}>
              <Input.Password />
            </Form.Item>
            <Form.Item label="New Password" name="newPassword" rules={Validation("password")}>
              <Input.Password />
            </Form.Item>
            <Form.Item label="Confirm Password" name="confirmPassword" rules={Validation("confirmPassword")}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isPending}>Save</Button>
            </Form.Item>
          </Form>
        </TabPane>
        </Tabs>
      </div>
    </div>
  );
};