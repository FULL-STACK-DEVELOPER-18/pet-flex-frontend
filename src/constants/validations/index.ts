import { Rule } from 'antd/lib/form';

//create a custom validation using antd
export const Validation = (action: string, data?: string): Rule[] => {
  switch (action) {
    case 'phoneNumber':
      return [
        { required: true, message: 'Please enter your phone number' },
        { len: 10, message: 'Phone number must be 10 digits' },
      ];
    case 'required':
      return [{ required: true, message: `Please input your ${data}!` }];
    case 'email':
      return [
        { required: true, message: 'Please input your email!' },
        { type: 'email', message: 'Please enter a valid email!' },
      ];
    case 'password':
      return [
        { required: true, message: 'Please input your password!' },
        { min: 4, message: 'Password must be at least 4 characters' },
        { max: 20, message: 'Password must be at most 20 characters' },
        {
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{4,20}$/,
          message:
            'Password must contain at least 1 uppercase, 1 lowercase, and 1 special character',
        },
      ];
    case 'confirmPassword':
      return [
        { required: true, message: 'Confirm password is required' },
        ({ getFieldValue }) => ({
          validator(_, value) {
            ``;
            if (!value || getFieldValue('newPassword') === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error('Confirm password does not match with New password!'),
            );
          },
        }),
      ];
    default:
      return [];
  }
};
