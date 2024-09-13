// src/pages/UserDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserDetail = () => {
  const { userId } = useParams();
  const users = useSelector((state) => state.users.list);
  const user = users.find((user) => user.id === parseInt(userId));
  const [view, setView] = useState('details');

  useEffect(() => {
    if (user) {
      const fetchPostsAndTodos = async () => {
        try {
          const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
          const todosResponse = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`);
          const posts = await postsResponse.json();
          const todos = await todosResponse.json();
          user.posts = posts;
          user.todos = todos;
        } catch (error) {
          console.error('Error fetching posts or todos:', error);
        }
      };
      fetchPostsAndTodos();
    }
  }, [user]);

  if (!user) return <p>Loading...</p>;

  const handleViewChange = (viewType) => {
    setView(viewType);
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
        <button onClick={() => handleViewChange('posts')}>Show Posts</button>
        <button onClick={() => handleViewChange('todos')}>Show Todos</button>
      </div>
      {view === 'posts' && (
        <div>
          <h2>Posts</h2>
          <ul>
            {user.posts && user.posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      )}
      {view === 'todos' && (
        <div>
          <h2>Todos</h2>
          <ul>
            {user.todos && user.todos.map((todo) => (
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
