import { executeApi } from '../../utils/axios/general';
import { AxiosResponse } from 'axios';

export interface ProgramData {
  programClassesName: string;
  weeks: number;
  _id?: string;
}

export const getProgramList = async () => {
  const response = await executeApi('get', 'http://localhost:3000/v1/api/program/classes-library/list') as AxiosResponse & { body: any };
  return response?.body;
};

export const createProgram = async (data: ProgramData) => {
  const response = await executeApi('post', 'http://localhost:3000/v1/api/program/classes-library/add', data) as AxiosResponse & { body: any };
  return response?.body;
};

export const updateProgram = async (id: string, data: ProgramData) => {
  const response = await executeApi('put', `http://localhost:3000/v1/api/program/classes-library/${id}`, data) as AxiosResponse & { body: any };
  return response?.body;
};
