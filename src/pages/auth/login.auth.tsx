import { Button, Form, Input } from "antd";
import { Validation } from "../../constants/validations";
import { Link, useNavigate } from "react-router-dom";
import { routeConstant } from "../../constants/routes";
import { useMutation } from "@tanstack/react-query";
import { setLocalStorageItem } from "../../utils/local-storage";
import { ShowNotification } from "../../utils/notification";
import { loginUser, loginWithGoogle } from "../../redux/actions/auth.action";
import axios, { AxiosError } from "axios";
import { useGoogleLogin } from '@react-oauth/google';
import './login.style.scss';

export interface LoginResponse {
  token?: string;
}

export const Login = () => {
  const navigate = useNavigate();

  const { mutate, error, isPending } = useMutation({
    mutationKey: ['LOGINNED_USER'],
    mutationFn: loginUser,
    onSuccess: (data: LoginResponse) => {
      setLocalStorageItem('token', data.token!);
      navigate(`${routeConstant.app.clientPets.path}`);
      ShowNotification({
        message: 'Login successfully!',
        type: 'success',
      });
    },
  });

  const { mutate: googleLoginMutation } = useMutation({
    mutationKey: ['GOOGLE_LOGIN'],
    mutationFn: loginWithGoogle,
    onSuccess: (data: LoginResponse) => {
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
    <div className="login-container">
      <div className="login-image"></div>
      <div className="login-form-container">
        <Form
          className="login-form"
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

          <Form.Item className="forget-pwd">
            <a href="/forgot-password">Forgot password</a>
          </Form.Item>

          <Form.Item className="login-btn">
            <Button type="primary" htmlType="submit" loading={isPending}>
              Login
            </Button>
          </Form.Item>

          <Form.Item className="google-login-btn">
            <Button onClick={() => googleLogin()} type="default">
              Login with Google
            </Button>
          </Form.Item>

          <Form.Item className="login-text">
            <span>
              Don't have an account?{' '}
              <Link to={routeConstant.app.signup.path}>SignUp</Link>
            </span>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};