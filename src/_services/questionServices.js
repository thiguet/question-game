import { doRequest } from '@/_helpers/request-options';

const SESSION_IDENTIFIER = 'SESSION_ID';
const LAST_SESSION_IDENTIFIER = 'LAST_SESSION_ID';

export const getQuestion = async () => {
  const query = {
    query: `
      query { 
        question { 
          label 
          answers 
        } 
      }
    `,
  };

  const { data } = await doRequest(query);
  return data.question;
};

export const newQuestion = async (label, answers, rightAnswerPosition) => {
  const query = {
    query: `mutation { 
      createQuestion ( 
        description: "${label}" 
        answers: [${answers.map((a, index) => `{description: "${a.text}", rightAnswer: ${index === rightAnswerPosition}}`)}] ) 
        { 
          id 
          description 
          answers { 
            description 
            rightAnswer 
          } 
        } 
      }`,
  };
  return doRequest(query);
};

export const getSessionId = () => localStorage.getItem(SESSION_IDENTIFIER);

export const getLastSessionId = () => localStorage.getItem(LAST_SESSION_IDENTIFIER);

export const answerQuestion = (questionId, answerId, userId) => {
  const query = {
    query: `mutation { 
      saveUserAnswer ( 
        questionId: ${questionId} 
        answerId: ${answerId} 
        userId: ${userId}
        sessionId: ${getSessionId()} 
      ) {
        questionId
        answerId
        userId
        sessionId
      }
    }`,
  };

  return doRequest(query);
};

export const getSessionQuestions = () => {
  const sessionId = getSessionId();

  const query = {
    query: `
    query { 
      questions(sessionId: "${sessionId}") { 
        id
        description
        answers { 
          id
          description 
          rightAnswer 
        } 
      } 
    }`,
  };

  return doRequest(query);
};
