import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

import { signOut } from '@/contexts/AuthContext';

export const Api = axios.create({
  baseURL: 'https://lidershomolog.azurewebsites.net/api/',
  headers: {
    Authorization: `Bearer ${parseCookies()['lidersclubadmin.token']}`,
    'X-ZUMO-AUTH': parseCookies()['lidersclubadmin.token'],
    'ZUMO-API-VERSION': '2.0.0',
  },
});

Api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    if (error?.response?.status === 401) {
      signOut();
    } else {
      return Promise.reject(error); 
    }
  }
);
