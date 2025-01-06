import { AxiosResponse } from "axios";
import { executeApi } from "../../utils/axios/general";

//FETCH EXSTING USERS
export const fetchClientPetList = async () => {
  const response = await executeApi('get', 'http://localhost:3000/v1/api/client/list') as AxiosResponse & { body: any };
  return response?.body;
};
