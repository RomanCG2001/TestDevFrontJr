// src/hooks/useFetchTodos.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTodos } from '../redux/todosSlice';

const useFetchTodos = (userId) => {
  const dispatch = useDispatch();

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
  }, [userId, dispatch]);
};

export default useFetchTodos;
