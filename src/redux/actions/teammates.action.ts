import { AxiosResponse } from "axios";
import { executeApi } from "../../utils/axios/general";
import { TeammateData } from "../../interfaces/teammate.interface.ts";

export const fetchTeammateList = async () => {
  const response = await executeApi('get', 'http://localhost:3000/v1/api/teammates/list') as AxiosResponse & { body: any };
  return response?.body;
};

export const createTeammate = async (data: TeammateData) => {
  const response = await executeApi('post', 'http://localhost:3000/v1/api/teammates/add', data) as AxiosResponse & { body: any };
  return response?.body;
};

export const updateTeammate = async (id: string, data: TeammateData) => {
  const response = await executeApi('put', `http://localhost:3000/v1/api/teammates/${id}`, data) as AxiosResponse & { body: any };
  return response?.body;
};

export const deleteTeammate = async (id: string) => {
  const response = await executeApi('delete', `http://localhost:3000/v1/api/teammates/${id}`) as AxiosResponse & { body: any };
  return response?.body;
};