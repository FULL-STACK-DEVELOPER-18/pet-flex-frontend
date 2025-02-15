import { FC } from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { routeConstant } from '../../constants/routes';
import { ShowNotification } from '../../utils/notification';
import { Validation } from '../../constants/validations';
import { loginWithGoogle, registerUser } from '../../redux/actions/auth.action';
import { setLocalStorageItem } from "../../utils/local-storage";
import axios, { AxiosError } from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import './signup.style.scss';

export interface SignupResponse {
  token?: string;
}

export const Signup: FC = () => {
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['REGISTER_USER'],
    mutationFn: registerUser,
    onSuccess: () => {
      navigate(`${routeConstant.app.login.path}`);
      ShowNotification({
        message: 'User registered successfully',
        type: 'success',
      });
    },
  });

  const { mutate: googleLoginMutation } = useMutation({
    mutationKey: ['GOOGLE_LOGIN'],
    mutationFn: loginWithGoogle,
    onSuccess: (data: SignupResponse) => {
      setLocalStorageItem('token', data.token!);
      navigate(`${routeConstant.app.clientPets.path}`);
      ShowNotification({
        message: 'Google login successful!',
        type: 'success',
      });
    },
    onError: (error: any) => {
      ShowNotification({
        message: error?.response?.data?.message || 'Google login failed!',
        type: 'error',
      });
    },
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          }
        );
        console.log("calllll", userInfo)
        
        googleLoginMutation({
          email: userInfo.data.email,
          name: userInfo.data.name,
        });
      } catch (error) {
        ShowNotification({
          message: 'Failed to get Google user info',
          type: 'error',
        });
      }
    },
    onError: () => {
      ShowNotification({
        message: 'Google login failed',
        type: 'error',
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
    <div className="signup-container">
      <div className="signup-image"></div>
      <div className="signup-form-container">
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
            <Button type="primary" htmlType="submit" loading={isPending}>
              Sign Up
            </Button>
          </Form.Item>

          <Form.Item className="google-login-btn">
            <Button onClick={() => googleLogin()} type="default">
              Login with Google
            </Button>
          </Form.Item>

          <Form.Item className="signup-text">
            <span>
              Already have an account?{' '}
              <Link to={routeConstant.app.login.path}>Login</Link>
            </span>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};