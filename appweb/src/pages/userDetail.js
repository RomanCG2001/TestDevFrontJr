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

  if (!user) return <p className="text-center text-gray-700">Cargando...</p>;

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
    <div className='bg-zinc-900 min-h-screen justify-center'>
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl my-10 font-heading text-slate-100">{user.name} </h1>
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <p><strong>Usuario:</strong> {user.username}</p>
        <p><strong>Correo:</strong> {user.email}</p>
        <p><strong>Teléfono:</strong> {user.phone}</p>
        <p><strong>Sitio web:</strong> {user.website}</p>
      </div>
      <div className="mb-4">
        <button
          className="bg-violet-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => handleViewChange('posts')}
        >
          {view === 'posts' ? 'Esconder publicaciones' : 'Mostrar publicaciones'}
        </button>
        <button
          className="bg-amber-500 text-white px-4 py-2 rounded"
          onClick={() => handleViewChange('todos')}
        >
          {view === 'todos' ? 'Esconder pendientes' : 'Mostrar pendientes'}
        </button>
      </div>

      <div className='my-3'>
      <Link to="/" className="text-stone-400 hover:underline">Volver a lista de usuarios</Link>
      </div>
      
      {view === 'posts' && (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Publicaciones</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="border-b py-2">
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p>{post.body}</p>
                <h4 className="text-md font-semibold mt-2">Comentarios:</h4>
                <ul>
                  {post.comments.map((comment) => (
                    <li key={comment.id} className="ml-4 border-t pt-2">
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
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Pendientes</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Nuevo pendiente:</label>
              <input
                id="title"
                name="title"
                type="text"
                value={newTodo.title}
                onChange={handleInputChange}
                className="border-2 border-zinc-300 rounded-md shadow-sm w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="completed" className="text-sm font-medium text-gray-700">Completado:</label>
              <input
                id="completed"
                name="completed"
                type="checkbox"
                checked={newTodo.completed}
                onChange={handleInputChange}
                className="ml-2"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </form>
          <ul className='my-10'>
            {todos.map((todo) => (
              <li key={todo.id} className="border-b py-2">
                {todo.title} - {todo.completed ? 'Completado' : 'Pendiente'}
              </li>
            ))}
          </ul>
          
        </div>
      )}
    </div>
    </div>
  );
};

export default UserDetail;
