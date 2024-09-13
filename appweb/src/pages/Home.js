import React from 'react';
import useFetchUsers from '../hooks/useFetchUsers';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  useFetchUsers();
  const users = useSelector((state) => state.users.list);

  return (
    <div class="bg-zinc-900 min-h-screen justify-center">
      <div class="flex justify-center">
        <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl my-10 font-heading text-slate-100">Usuarios</h1>
      </div>
      <div class="flex justify-center">
        <h3 class="font-bold text-xl font-heading text-slate-100">Selecciona un usuario para ver su informacion, publicaciones y pendientes ;) </h3>
      </div>
      <div class="max-w-screen-md mx-auto py-10">
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          
          <ul class="divide-y divide-gray-200">
            {users.map((user) => (
              <Link to={`/user/${user.id}`}>
              <li class="p-3 flex justify-between items-center user-card transition duration-300 ease-in-out hover:bg-zinc-400" key={user.id}>
                <div class="flex items-center">
                  <span class="ml-3 font-medium">{user.name}</span>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </div>
              </li>
              </Link>
            ))}
          </ul>

        </div> 
      </div>
    </div>
  );
};

export default Home;
