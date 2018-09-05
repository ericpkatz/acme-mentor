import { Link } from 'react-router-dom';
import React from 'react';
export default ({ users, managers })=> {
  return (
    <ul>
      <li>
        <Link to='/users'>Users ({ users.length })</Link>
      </li>
      <li>
        <Link to='/managers'>Managers ({ managers.length })</Link>
      </li>
      <li>
        <Link to='/users/create'>Users Create</Link>
      </li>
    </ul>
  );
};
