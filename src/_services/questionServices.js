import config from '@/_config/config';
import { requestOptions, handleResponse } from '@/_helpers/request-options';

const doRequest = async (graphQL) => fetch(`${config.apiUrl}`, requestOptions.post(graphQL))
  .then(handleResponse);

export const getQuestion = async () => {
  const query = {
    query: 'query { question { label answers } }',
  };

  const { data } = await doRequest(query);
  return data.question;
};

export const newQuestion = async (label, answers) => {
  const query = {
    query: `mutation { createQuestion ( label: "${label}" answers: [${answers.map((a) => `{label: "${a.text}", correct: ${a.correct}}`)}] ) { id label answers { label correct } } }`,
  };

  return doRequest(query);
};
