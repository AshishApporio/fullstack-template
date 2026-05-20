import { AxiosError } from 'axios';

export interface ParsedError {
  message: string;
  errors?: { field: string; message: string }[];
  statusCode?: number;
}

export const parseApiError = (error: unknown): ParsedError => {
  if (error instanceof AxiosError) {
    const data = error.response?.data;
    return {
      message: data?.message || 'Something went wrong',
      errors: data?.errors,
      statusCode: error.response?.status,
    };
  }
  if (error instanceof Error) return { message: error.message };
  return { message: 'Unknown error occurred' };
};
