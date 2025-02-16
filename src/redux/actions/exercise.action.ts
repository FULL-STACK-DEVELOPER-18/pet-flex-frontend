import { executeApi } from '../../utils/axios/general';
import { AxiosResponse } from 'axios';


export const fetchExerciseList = async () => {
    const response = await executeApi('get', 'http://localhost:3000/v1/api/exercise/list') as AxiosResponse & { body: any };
    return response?.body;
  };
  
  export const addExerciseApi = async (data: FormData) => {
    const response = await executeApi('post', 'http://localhost:3000/v1/api/exercise/add', data) as AxiosResponse & { body: any };
    return response?.body;
  };
  
  export const updateExerciseApi = async (id: string, data: FormData) => {
    const response = await executeApi('put', `http://localhost:3000/v1/api/exercise/${id}`, data) as AxiosResponse & { body: any };
    return response?.body;
  };

  export const deleteExerciseApi = async (id: string) => {
    const response = await executeApi('delete', `http://localhost:3000/v1/api/exercise/${id}`) as AxiosResponse & { body: any };
    return response?.body;
  };
  