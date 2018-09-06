import { Link } from 'react-router-dom';
import React from 'react';
export default ({ users, managers, path })=> {
  const selected = (_path) => _path === path;

  return (
    <ul>
      <li className={ selected('/users') ? 'selected': '' }>
        <Link to='/users'>Users ({ users.length })</Link>
      </li>
      <li className={ selected('/managers') ? 'selected': '' }>
        <Link to='/managers'>Managers ({ managers.length })</Link>
      </li>
      <li className={ selected('/users/create') ? 'selected': '' }>
        <Link to='/users/create'>Users Create</Link>
      </li>
    </ul>
  );
};
