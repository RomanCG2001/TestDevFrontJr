// src/pages/Home.js
import React from 'react';
import useFetchUsers from '../hooks/useFetchUsers';
import { useSelector } from 'react-redux';

const Home = () => {
  useFetchUsers();
  const users = useSelector((state) => state.users.list);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

