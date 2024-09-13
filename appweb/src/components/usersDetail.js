// src/components/UserDetail.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../redux/usersSlice';
import { fetchUserPosts } from '../redux/postsSlice';
import { fetchUserTodos } from '../redux/todosSlice';

const UserDetail = ({ userId }) => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.users);
  const [view, setView] = useState('info');

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  const handleViewChange = (type) => {
    setView(type);
    if (type === 'posts') {
      dispatch(fetchUserPosts(userId));
    } else if (type === 'todos') {
      dispatch(fetchUserTodos(userId));
    }
  };

  return (
    <div>
      {status === 'cargando' && <p>Cargando...</p>}
      {status === 'fallido' && <p>Error: {error}</p>}
      {status === 'exitoso' && user && (
        <div>
          <h2>{user.name}</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>Address: {user.address?.street}, {user.address?.city}</p>
          <p>Company: {user.company?.name}</p>
          
          <button onClick={() => handleViewChange('posts')}>Ver Posts</button>
          <button onClick={() => handleViewChange('todos')}>Ver Todos</button>
          
          {view === 'posts' && (
            <div>
              {/* Mostrar posts aquí */}
            </div>
          )}
          {view === 'todos' && (
            <div>
              {/* Mostrar todos aquí */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDetail;
