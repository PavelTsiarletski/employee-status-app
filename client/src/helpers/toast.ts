import { toast as notify } from 'react-toastify';

export const toast = {
  success: (msg: string) => {
    if (import.meta.env.DEV) notify.success(msg);
  },
  error: (msg: string) => {
    if (import.meta.env.DEV) notify.error(msg);
  },
  info: (msg: string) => {
    if (import.meta.env.DEV) notify.info(msg);
  },
};
