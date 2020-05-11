import { doRequest } from '@/_helpers/request-options';
import { getLastSessionId } from '@/_services/questionServices';

export const getUsers = async () => {
  const sessionId = getLastSessionId();

  const query = {
    query: `
      query { 
        getRankedUsers(sessionId: ${sessionId}) { 
            id
            name
            points
        } 
      }`,
  };

  return doRequest(query);
};

export default {};
