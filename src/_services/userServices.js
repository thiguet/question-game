import { doRequest } from '@/_helpers/request-options';

const USER_IDENTIFIER = 'currentUser';

export const getUser = () => {
  const userData = JSON.parse(localStorage.getItem(USER_IDENTIFIER));
  return userData || {};
};

export const newUser = async (name) => {
  const query = {
    query: `mutation { createUser( name: "${name}" ) { id } }`,
  };

  return doRequest(query);
};
