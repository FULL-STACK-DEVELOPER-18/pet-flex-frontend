import { Button, Form, Input } from "antd";
import { Validation } from "../../constants/validations";
import { Link, useNavigate } from "react-router-dom";
import { routeConstant } from "../../constants/routes";
import { useMutation } from "@tanstack/react-query";
import { setLocalStorageItem } from "../../utils/local-storage";
import { ShowNotification } from "../../utils/notification";
import { loginUser } from "../../redux/actions/auth.action";
import { AxiosError } from "axios";
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

  //Call when click on login button
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

      <Form.Item className="signup-text">
        <span>
          Don't have an account?{' '}
          <Link to={routeConstant.app.signup.path}>SignUp</Link>
        </span>
      </Form.Item>
    </Form>
  );
};