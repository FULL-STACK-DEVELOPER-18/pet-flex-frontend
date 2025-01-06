import { AxiosResponse } from "axios";
import { executeApi } from "../../utils/axios/general";

export const fetchBlogList = async () => {
  const response = await executeApi('get', 'http://localhost:3000/v1/api/blog/list') as AxiosResponse & { body: any };
  return response?.body;
};

export const deleteBlogApi = async (id: string) => {
  await executeApi('delete', `http://localhost:3000/v1/api/blog/${id}`);
};

export const createBlogApi = async (data: any) => {
  const response = await executeApi('post', `http://localhost:3000/v1/api/blog/add`, data) as AxiosResponse & { body: any };
  return response?.body;
};

export const updateBlogApi = async (id: string, data: any) => {
  const response = await executeApi('put', `http://localhost:3000/v1/api/blog/${id}`, data) as AxiosResponse & { body: any };
  return response?.body;
};
