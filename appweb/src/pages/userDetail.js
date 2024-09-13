// src/pages/UserDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useFetchPosts from '../hooks/useFetchPosts';
import useFetchTodos from '../hooks/useFetchTodos';
import { setTodos } from '../redux/todosSlice';

const UserDetail = () => {
  const { userId } = useParams();
  const users = useSelector((state) => state.users.list);
  const posts = useSelector((state) => state.posts.posts);
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const user = users.find((user) => user.id === parseInt(userId));
  const [view, setView] = useState('details');
  const [newTodo, setNewTodo] = useState({ title: '', completed: false });

  useFetchPosts(userId);
  useFetchTodos(userId);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosResponse = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
        const todos = await todosResponse.json();
        const sortedTodos = todos.sort((a, b) => b.id - a.id);
        dispatch(setTodos(sortedTodos));
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [dispatch, userId]);

  if (!user) return <p>Loading...</p>;

  const handleViewChange = (viewType) => {
    setView((prevView) => (prevView === viewType ? 'details' : viewType));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.id,
          ...newTodo
        })
      });
      if (response.ok) {
        const savedTodo = await response.json();
        dispatch(setTodos([...todos, savedTodo].sort((a, b) => b.id - a.id)));
        setNewTodo({ title: '', completed: false });
      } else {
        console.error('Failed to save todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving todo:', error);
    }
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
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                id="title"
                name="title"
                type="text"
                value={newTodo.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="completed">Completed:</label>
              <input
                id="completed"
                name="completed"
                type="checkbox"
                checked={newTodo.completed}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      )}
      <Link to="/">Back to Users List</Link>
    </div>
  );
};

export default UserDetail;
