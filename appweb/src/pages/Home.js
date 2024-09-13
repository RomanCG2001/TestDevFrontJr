import React from 'react';
import useFetchUsers from '../hooks/useFetchUsers';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  useFetchUsers();
  const users = useSelector((state) => state.users.list);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
