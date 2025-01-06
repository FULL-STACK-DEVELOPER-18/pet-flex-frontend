import { AxiosResponse } from "axios";
import { executeApi } from "../../utils/axios/general";

export const loginUser = async (data: any) => {
  const response = await executeApi('post', 'http://localhost:3000/v1/api/auth/login', data) as AxiosResponse & { body: any };
  return response?.body;
};

export const registerUser = async (data: any) => {
  const response = await executeApi('post', 'http://localhost:3000/v1/api/auth/register', data) as AxiosResponse & { body: any };
  return response?.body;
};

export const forgotPassword = async (data: any) => {
  const response = await executeApi('post', 'http://localhost:3000/v1/api/auth/forgot-password', data) as AxiosResponse & { body: any };
  return response?.body;
};

export const resetPassword = async (data: any) => {
  const response = await executeApi('post', 'http://localhost:3000/v1/api/auth/reset-password', data) as AxiosResponse & { body: any };
  return response?.body;
};

export const changePassword = async (data: any) => {
  const response = await executeApi('post', 'http://localhost:3000/v1/api/auth/change-password', data) as AxiosResponse & { body: any };
  return response?.body;
};
