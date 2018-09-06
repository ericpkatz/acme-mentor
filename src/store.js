import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import axios from 'axios';

const filterManagers = (users)=> {
  const managerMap = users.reduce((memo, user)=> {
    if(user.managerId){
      memo[user.managerId] = null;
    }
    return memo;
  }, {});
  return Object.keys(managerMap).reduce((memo, key)=> {
    const manager = users.find(user => user.id === key*1);
    memo.push(manager);
    return memo;
  }, []); 

}

const userMap = (users)=> {
  return users.reduce((memo, user)=> {
    memo[user.id] = user;
    return memo;
  }, {});
}

const usersReducer = (state=[], action)=>{
  switch(action.type){
    case 'SET_USERS':
      state = action.users;
      break;
  }
  return state;
}

const reducer = combineReducers({
  users: usersReducer
});

const store = createStore(reducer, applyMiddleware(logger));

const fetchUsers = () => {
  axios.get('/api/users')
    .then( response => response.data)
    .then( users => store.dispatch({
      type: 'SET_USERS',
      users
    }));
}

const fetchUser = (id) => {
  return axios.get(`/api/users/${id}`)
    .then( response => response.data);
}

export { fetchUser, fetchUsers, filterManagers, userMap };
export default store;
