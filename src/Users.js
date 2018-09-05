import React from 'react';
import { Link } from 'react-router-dom';

export default ({ users, destroyUser, userMap })=> {
  return (
    <ul>
    {
      users.map( user => {
        const manager = userMap[user.managerId];
        return (
          <li key={ user.id }>
            <Link to={`/users/${user.id}`}>{ user.name }</Link>
            {
              manager ? (
                <span>Manage by { manager.name }</span>
              ): (null)
            }
            <button onClick={ ()=> destroyUser(user)}>x</button>
          </li>
        )
      })
    }
    </ul>
  );
}
