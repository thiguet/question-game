import { doRequest } from '@/_helpers/request-options';

export const login = async ({ name, pass }) => {
  const query = {
    query: `query {
      auth(name: "${name}" pass: "${pass}") {
        id
        name
        token
      }
    }`,
  };

  const { data } = await doRequest(query);
  return data.auth;
};

export const logout = () => localStorage.removeItem('currentUser');

export const currentUser = () => JSON.parse(localStorage.getItem('currentUser') || '{}');
