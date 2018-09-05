import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { Switch, HashRouter as Router, Link, Route } from 'react-router-dom';
import Users from './Users';
import Managers from './Managers';
import UserCreate from './UserCreate';
import Nav from './Nav';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';

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

class App extends Component{
  constructor(){
    super();
    this.state = store.getState();
  }
  componentDidMount(){
    store.subscribe(()=> {
      this.setState(store.getState());
    });
    fetchUsers();
  }
  destroyUser(user){
    return axios.delete(`/api/users/${user.id}`)
      .then(()=> {
        fetchUsers();
      })
  }
  createUser(user){
    return axios.post(`/api/users`, user)
      .then( () => {
        fetchUsers();
      })
  }
  updateUser(user){
    return axios.put(`/api/users/${user.id}`, user)
      .then( () => {
        fetchUsers();
      })
  }
  render(){
    const { users } = this.state;
    const { destroyUser, createUser, updateUser } = this;
    return (
      <Router>
        <div>
          <Route component={()=> <Nav users={users} managers={ filterManagers(users)}/>} />
          <Route path='/users' render={ ()=> <Users users={ users } destroyUser={ destroyUser } userMap={ userMap( users )}/>} />
          <Switch>
            <Route path='/users/create' render={ ({ history })=> <UserCreate users={ users } save={ createUser } history={ history }/>} />
            <Route path='/users/:id' render={ ({ match, history })=> <UserCreate users={ users } save={ updateUser } id={ match.params.id } history={ history} fetchUser={ fetchUser }/>} />
          </Switch>
          <Route path='/managers' render={ ()=> <Managers users={ filterManagers(users) } />} />
        </div>
      </Router>
    );
  }
}

const root = document.getElementById('root');
render(<App />, root);
