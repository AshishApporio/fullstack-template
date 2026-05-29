import { AxiosError } from 'axios';
import { ERROR_MESSAGES } from '@/constants/messages';

export interface ParsedError {
  message: string;
  errors?: { field: string; message: string }[];
  statusCode?: number;
}

export const parseApiError = (error: unknown): ParsedError => {
  if (error instanceof AxiosError) {
    const data = error.response?.data;
    return {
      message: data?.message || ERROR_MESSAGES.DEFAULT,
      errors: data?.errors,
      statusCode: error.response?.status,
    };
  }
  if (error instanceof Error) return { message: error.message };
  return { message: ERROR_MESSAGES.UNKNOWN };
};
