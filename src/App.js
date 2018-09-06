import React, { Component } from 'react';
import { Switch, HashRouter as Router, Link, Route } from 'react-router-dom';
import Users from './Users';
import Managers from './Managers';
import UserCreate from './UserCreate';
import Nav from './Nav';
import store, { fetchUsers, filterManagers, userMap, fetchUser  } from './store';
import axios from 'axios';

export default class App extends Component{
  constructor(){
    super();
    this.state = store.getState();
  }
  componentDidMount(){
    store.subscribe(()=> this.setState(store.getState()));
    fetchUsers();
  }
  destroyUser(user){
    return axios.delete(`/api/users/${user.id}`).then(()=> fetchUsers());
  }
  createUser(user){
    return axios.post(`/api/users`, user).then(()=> fetchUsers());
  }
  updateUser(user){
    return axios.put(`/api/users/${user.id}`, user).then(()=> fetchUsers());
  }
  render(){
    const { users } = this.state;
    const { destroyUser, createUser, updateUser } = this;
    const renderNav = ({ location })=> {
      return (
        <Nav users={users} path={ location.pathname} managers={ filterManagers(users)}/>
      );
    };
    const renderUsers = ()=> <Users users={ users } destroyUser={ destroyUser } userMap={ userMap( users )}/>;
    const renderUserUpdate =  ({ match, history })=> <UserCreate users={ users } save={ updateUser } id={ match.params.id } history={ history} fetchUser={ fetchUser }/>;
    const renderUserCreate =  ({ history })=> <UserCreate users={ users } save={ createUser } history={ history }/>;
    const renderManagers =  ()=> <Managers users={ filterManagers(users) } /> 
    return (
      <Router>
        <div>
          <Route render={ renderNav } />
          <Route path='/users' render={ renderUsers } />
          <Switch>
            <Route path='/users/create' render={ renderUserCreate } />
            <Route path='/users/:id' render={ renderUserUpdate } />
          </Switch>
          <Route path='/managers' render={ renderManagers } />
        </div>
      </Router>
    );
  }
}
