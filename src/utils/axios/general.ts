import axios, { AxiosResponse } from 'axios';
import { getLocalStorageItem } from '../local-storage';
// import { ShowNotification } from '../notification';

// export interface apiClientProps {
//   method?: string;
//   url?: string;
//   data?: object;
//   headers?: object;
//   noHeaders?: object;
// }

// const defaultHeaders = {
//   'Cache-Control': 'no-cache',
//   Pragma: 'no-cache',
//   Expires: '0',
// };

// export const multipathHeader = {
//   'Content-Type': 'multipart/form-data',
// };

// export const defaultAxios = axios.create({});

// export const getCookies = (cookie: string) => {
//   let da: string[] = [];
//   let getCookie;
//   if (typeof window !== 'undefined') {
//     da = window.document.cookie.split(';');
//   }
//   // const da = document.cookie.split(';');
//   // eslint-disable-next-line array-callback-return
//   da.map((data) => {
//     const cookiess =
//       data.split('=')[0].trim() === 'HTTP_SERVER_SELECT'
//         ? data.split('=')[1]
//         : undefined;
//     if (cookiess !== undefined) {
//       getCookie = cookiess;
//     }
//   });
//   if (getCookie === cookie) {
//     return true;
//   }
//   return false;
// };

// export function apiClient({
//   url,
//   data = {},
//   method = 'POST',
//   headers = {},
//   noHeaders,
//   ...rest
// }: apiClientProps) {
//   if (
//     getLocalStorageItem('token') === '' ||
//     getLocalStorageItem('token') === null
//   ) {
//     delete defaultAxios.defaults.headers.common.Authorization;
//   }
//   if (getCookies('BETA')) {
//     defaultAxios.defaults.headers.serverselect = 'BETA';
//   }

//   return new Promise((resolve, reject) => {
//     defaultAxios({
//       method,
//       url,
//       headers: {
//         ...(noHeaders ? {} : defaultHeaders),
//         ...headers,
//       },
//       data,
//       ...rest,
//     })
//       .then((res) => {
//         if (res && res.status) {
//           resolve(res.data);
//         } else if (res.data && res.data.error) {
//           reject(res.data.error);
//           if (res.data.error.code === 'ER_UNAUTHORIZED_CLIENT') {
//             localStorage.clear();
//             delete defaultAxios.defaults.headers.common.Authorization;
//           } else if (res.data.statusCode === 400) {
//             /* empty */
//           } else if (res.data.error.code === 'ER_PLAN_EXPIRED') {
//             if (window.location.pathname !== '/plan-expired') {
//               window.location.pathname = '/plan-expired';
//             }
//             notification.error({
//               description: res.data.error.message,
//               message: undefined,
//             });
//           } else {
//             notification.error({
//               description: res.data.error.message,
//               message: undefined,
//             });
//           }
//         } else {
//           reject(res.data.error);
//         }
//       })
//       .catch((err) => {
//         reject(err?.response?.data);
//         if (
//           err?.response?.data?.statusCode === 404 ||
//           err?.response?.data?.statusCode === 406 ||
//           err?.response?.data?.statusCode === 403
//         ) {
//           err?.response?.data?.message !== '' &&
//             notification.error({
//               description: err?.response?.data?.message,
//               message: undefined,
//             });
//         }
//         if (
//           err?.response?.data?.statusCode === 403 &&
//           err?.response?.data?.message === 'Plan has expired'
//         ) {
//           if (window?.location?.pathname !== '/plan-expired') {
//             window.location.pathname = '/plan-expired';
//           }
//         }
//       });
//   });
// }

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

interface ApiError extends Error {
  response?: AxiosResponse;
}

export const executeApi = async <T>(
  method: HttpMethod,
  url: string,
  data?: object,
  token?: boolean,
): Promise<T> => {
  try {
    let config = {};
    if (!token) {
      config = {
        headers: { Authorization: `Bearer ${getLocalStorageItem('token')}` },
      };
    }
    const requestConfig = {
      method: method,
      url: url,
      data: data,
      ...config,
    };
    const response: AxiosResponse<T> = await axios(requestConfig);
    return response.data;
  } catch (error) {
    const err = error as ApiError;
    // ShowNotification({
    //   message: err.response?.data?.message || err.response?.data?.error.message,
    //   type: 'error',
    // });
    return Promise.reject(err);
  }
};
