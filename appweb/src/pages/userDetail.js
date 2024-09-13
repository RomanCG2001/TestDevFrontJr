// src/pages/UserDetail.js
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetchPosts from '../hooks/useFetchPosts';
import useFetchTodos from '../hooks/useFetchTodos';

const UserDetail = () => {
  const { userId } = useParams();
  const users = useSelector((state) => state.users.list);
  const posts = useSelector((state) => state.posts.posts);
  const todos = useSelector((state) => state.todos.todos);
  const user = users.find((user) => user.id === parseInt(userId));
  const [view, setView] = useState('details');

  useFetchPosts(userId);
  useFetchTodos(userId);

  if (!user) return <p>Loading...</p>;

  const handleViewChange = (viewType) => {
    setView((prevView) => (prevView === viewType ? 'details' : viewType));
  };

  return (
    <div>
      <h1>User Details</h1>
      <div>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
      </div>
      <div>
        <button onClick={() => handleViewChange('posts')}>
          {view === 'posts' ? 'Hide Posts' : 'Show Posts'}
        </button>
        <button onClick={() => handleViewChange('todos')}>
          {view === 'todos' ? 'Hide Todos' : 'Show Todos'}
        </button>
      </div>
      {view === 'posts' && (
        <div>
          <h2>Posts</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <h4>Comments:</h4>
                <ul>
                  {post.comments.map((comment) => (
                    <li key={comment.id}>
                      <p><strong>{comment.name}:</strong> {comment.body}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
      {view === 'todos' && (
        <div>
          <h2>Todos</h2>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.title} - {todo.completed ? 'Completed' : 'Pending'}</li>
            ))}
          </ul>
        </div>
      )}
      <Link to="/">Back to Users List</Link>
    </div>
  );
};

export default UserDetail;
