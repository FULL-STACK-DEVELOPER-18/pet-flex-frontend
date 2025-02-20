import { AxiosResponse } from "axios";
import { executeApi } from "../../utils/axios/general";

export const fetchUserProfile = async (data: any) => {
    const response = await executeApi('get', 'http://localhost:3000/v1/api/user/profile', data) as AxiosResponse & { body: any };
    return response?.body;
};

export const updateUserProfile = async (data: any) => {
  const response = await executeApi('put', 'http://localhost:3000/v1/api/user/profile', data) as AxiosResponse & { body: any };
  return response?.body;
};
  