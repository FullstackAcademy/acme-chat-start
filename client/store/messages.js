import axios from 'axios';

export default (state = [], action)=> {
  if(action.type === 'SET_MESSAGES'){
    return action.messages;
  }
  if(action.type === 'CREATE_MESSAGE'){
    return [...state, action.message];
  }
  return state;
};


export const createMessage = (message)=> {
  return async(dispatch) => {
    const response = await axios.post('/api/messages', message, {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
    return dispatch({ type: 'CREATE_MESSAGE', message: response.data });
  };
};

export const fetchMessages = ()=> {
  return async(dispatch) => {
    const response = await axios.get('/api/messages', {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
    dispatch({ type: 'SET_MESSAGES', messages: response.data});

  };
};

