import { AxiosError } from 'axios';

export const onApiCallRetry = (
  failureCount: number,
  error: Error | AxiosError,
) => {
  console.error('errdsfsdf', error);

  if (isAxiosError(error) && error.response) {
    if ([400, 401, 403, 404].includes(error.response.status)) {
      return false;
    }
  }

  return failureCount < 1;
};

// Type guard to check if the error is an AxiosError
const isAxiosError = (
  error: Error | AxiosError,
): error is AxiosError<unknown> => {
  return (error as AxiosError<unknown>).isAxiosError !== undefined;
};
