import React, { Component } from 'react';

export default class UserCreate extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      managerId: '' 
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
    if(this.props.id){
      this.props.fetchUser(this.props.id)
        .then(user => {
          this.setState({
            name: user.name,
            managerId: user.managerId || ''
          });
        });
    }
  }
  componentDidUpdate(prevProps){
    if(this.props.id && prevProps.id !== this.props.id){
      this.props.fetchUser(this.props.id)
        .then(user => {
          this.setState({
            name: user.name,
            managerId: user.managerId || ''
          });
        });
    }
    if(!this.props.id && prevProps.id){
      this.setState({
        name: '',
        managerId: ''
      });
    }
  }
  handleChange(ev){
    const change = {
      [ev.target.name ] : ev.target.value
    };
    this.setState(change);
  }
  onSave(ev){
    ev.preventDefault();
    this.props.save({
      name: this.state.name,
      managerId: this.state.managerId,
      id: this.props.id
    })
    .then(()=> this.props.history.push('/users'));
  }
  render(){
    const { handleChange, onSave } = this;
    const { name, managerId } = this.state;
    const { users, id } = this.props;
    return (
      <form onSubmit={ onSave }>
        <input value={ name } name='name' onChange={ handleChange } />
        <select value={ managerId } name='managerId' onChange={ handleChange }>
        <option value=''>--none--</option>
        {
          users.map(user => <option key={ user.id } value={ user.id }>{user.name}</option>)
        }
        </select>
        <button>{ id ? 'Update' : 'Save' }</button>
      </form>
    );
  }
}
