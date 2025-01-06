import { FC } from 'react';
import { Form, Input, Button } from 'antd';
import { ShowNotification } from '../../utils/notification';
import { routeConstant } from '../../constants/routes';
import { resetPassword } from '../../redux/actions/auth.action';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Validation } from '../../constants/validations';
import './reset-password.style.scss';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();

  const { mutate, error, isPending } = useMutation({
    mutationKey: ['RESET_PASSWORD'],
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate(`${routeConstant.app.login.path}`);
      ShowNotification({
        message: 'Password reset successfully!',
        type: 'success',
      });
    },
  });


  const onFinish = (values: any) => {
    const { confirmPassword, otp, ...restValues } = values;
    const numericOtp = Number(otp);
    const requestData = { ...restValues, otp: numericOtp };
    mutate(requestData);
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
      className="reset-password-form"
      autoComplete="off"
      name="resetPassword"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item label="OTP" name="otp" rules={[{ required: true, message: 'Please enter the OTP sent to your email!' }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={Validation('email')}>
        <Input />
      </Form.Item>
      <Form.Item label="New Password" name="newPassword" rules={Validation('password')}>
        <Input.Password />
      </Form.Item>
      <Form.Item label="Confirm Password" name="confirmPassword" rules={Validation('confirmPassword')}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending}>Reset Password</Button>
      </Form.Item>
    </Form>
  );
};