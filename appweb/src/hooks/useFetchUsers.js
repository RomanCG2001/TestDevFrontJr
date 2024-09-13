// src/hooks/useFetchUsers.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUsers } from '../redux/userSlice';

const useFetchUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        const usersWithPosts = await Promise.all(users.map(async (user) => {
          const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`);
          const posts = await postsResponse.json();
          return { ...user, posts };
        }));
        dispatch(setUsers(usersWithPosts));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [dispatch]);
};

export default useFetchUsers;
