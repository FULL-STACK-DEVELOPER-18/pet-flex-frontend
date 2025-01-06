import { AxiosResponse } from "axios";
import { executeApi } from "../../utils/axios/general";

export const fetchEvents = async () => {
    const response = await executeApi('get', 'http://localhost:3000/v1/api/event/list') as AxiosResponse & { body: any };
    return response?.body;
};
  
export const createEvent = async (eventData: any) => {
    const response = await executeApi('post', 'http://localhost:3000/v1/api/event/add', eventData) as AxiosResponse & { body: any };
    return response?.body;
};

export const updateEvent = async (id: string, eventData: any) => {
    const response = await executeApi('put', `http://localhost:3000/v1/api/event/${id}`, eventData) as AxiosResponse & { body: any };
    return response?.body;
};

export const deleteEvent = async (id: string) => {
    const response = await executeApi('delete', `http://localhost:3000/v1/api/event/${id}`) as AxiosResponse & { body: any };
    return response?.body;
};