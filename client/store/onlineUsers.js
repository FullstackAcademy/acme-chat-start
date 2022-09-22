import axios from 'axios';


export default (state = [], action)=> {
  if(action.type === 'SET_ONLINE_USERS'){
    return action.onlineUsers;
  }
  if(action.type === 'USER_LEFT'){
    return state.filter(user => action.user.id !== user.id);
  }
  if(action.type === 'USER_ENTERED'){
    if(!state.find(user => action.user.id === user.id)){
      state = [...state, action.user];
    }
  }
  return state;
};

export const fetchOnlineUsers = ()=> {
  return async(dispatch) => {
    const response = await axios.get('/api/onlineUsers', {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
    dispatch({ type: 'SET_ONLINE_USERS', onlineUsers: response.data});
  };
};
