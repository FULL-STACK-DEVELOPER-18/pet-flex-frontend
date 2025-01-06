import { FC } from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { routeConstant } from '../../constants/routes';
import { ShowNotification } from '../../utils/notification';
import { Validation } from '../../constants/validations';
import { registerUser } from '../../redux/actions/auth.action';
import { AxiosError } from 'axios';
import './signup.style.scss';

export const Signup: FC = () => {
  const navigate = useNavigate();

  //Signup submit mutation
  const { mutate, isPending, error } = useMutation({
    mutationKey: ['REGISTER_USER'],
    mutationFn: registerUser,
    onSuccess: () => {
      navigate(`${routeConstant.app.login.path}`);
      ShowNotification({
        message: 'User registred sucessfully',
        type: 'success',
      });
    },
  });

  //Signup submit event
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
      className="signup-form"
      autoComplete="off"
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item label="Email" name="email" rules={Validation('email')}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={Validation('password')}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item className="signup-btn">
        <Button type="primary" htmlType="submit" loading={isPending}>Sign Up</Button>
      </Form.Item>

      <Form.Item className="signup-text">
        <span>
          Already have an account?{' '}
          <Link to={routeConstant.app.login.path}>Login</Link>
        </span>
      </Form.Item>
    </Form>
  );
};
