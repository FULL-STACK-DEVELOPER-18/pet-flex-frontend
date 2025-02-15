import { FC } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routeConstant } from '../../constants/routes';
import { Validation } from '../../constants/validations';
import { ShowNotification } from '../../utils/notification';
import { forgotPassword } from '../../redux/actions/auth.action';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import './forgot-password.style.scss';

export const ForgotPassword: FC = () => {
  console.log("test")
  const navigate = useNavigate();

  const { mutate, error, isPending } = useMutation({
    mutationKey: ['FORGOT_PASSWORD'],
    mutationFn: forgotPassword,
    onSuccess: () => {
      navigate(`${routeConstant.app.reset_password.path}`);
      ShowNotification({
        message: 'Sending OTP successfully!',
        type: 'success',
      });
    },
  });

  const onFinish = (values: any) => {
    mutate(values);
  };

  if (error) {
    const axiosError = error as AxiosError<{ status: number; message: string }>;
    ShowNotification({
      message: axiosError?.response?.data?.message || 'Something went wrong!',
      type: 'error',
    });
  }

  return (
    <Form
      className="forgot-password-form"
      autoComplete="off"
      name="forgotPassword"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item label="Email" name="email" rules={Validation('email')}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending}>Send OTP</Button>
      </Form.Item>
    </Form>
  );
};