import config from '@/_config/config';
import { requestOptions, handleResponse } from '@/_helpers/request-options';

const doRequest = async (graphQL) => fetch(`${config.apiUrl}`, requestOptions.post(graphQL))
  .then(handleResponse);

export const getUser = async () => {
  const query = {
    query: 'query { users { id name points } }',
  };
  const { data } = await doRequest(query);
  return data.users;
};

export const newUser = async (name) => {
  const query = {
    query: `mutation { createUser( name: "${name}" ) { id } }`,
  };

  return await doRequest(query);
};
