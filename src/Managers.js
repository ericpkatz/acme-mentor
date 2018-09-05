import React from 'react';

export default ({ users })=> {
  return (
    <ul>
    {
      users.map( user => <li key={ user.id}>{ user.name }</li>)
    }
    </ul>
  );
}
