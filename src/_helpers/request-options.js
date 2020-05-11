import { QuestionsAPI } from '@/_config/config';

export const handleResponse = async (resp) => {
  try {
    return resp.json();
  } catch (e) {
    return {
      message: 'Ocorreu um erro! Favor conferir sua conexão com a internet.',
    };
  }
};

const headers = () => {
  const currentUser = localStorage.getItem('currentUser') || {};
  const authHeader = currentUser.token ? { Authorization: `Bearer ${currentUser.token}` } : {};
  return {
    headers: {
      ...authHeader,
      'Content-Type': 'application/json',
    },
  };
};

export const requestOptions = {
  get() {
    return {
      method: 'GET',
      ...headers(),
    };
  },
  post(body) {
    return {
      method: 'POST',
      ...headers(),
      body: JSON.stringify(body),
    };
  },
};

export const doRequest = async (graphQL) => fetch(`${QuestionsAPI}`, requestOptions.post(graphQL))
  .then(handleResponse);
