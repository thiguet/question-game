import config from '@/_config/config';
import { requestOptions, handleResponse } from '@/_helpers/request-options';

export const login = async (username, password) => fetch(`${config.apiUrl}/u/auth`,
  requestOptions.post({ username, password }))
  .then(handleResponse)
  .then((user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  });

export const logout = () => localStorage.removeItem('currentUser');

export const currentUser = () => JSON.parse(localStorage.getItem('currentUser') || '{}');
