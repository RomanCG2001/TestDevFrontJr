import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//Estado inicial

const estadoInicial = {
    users: [],
    status: 'idle',
    error: null
};

// Acción asincrona para obtener usuarios
export const fetchUsuarios = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users'); 
    if(!response.ok) throw new Error('Error de respuesta');
    const data = await response.json();
    return data;
}); 

//Slice para usuarios
const usuariosSlice = createSlice({
    name: 'users',
    estadoInicial,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsuarios.pending, (state) => {
                state.status = 'cargando';
            })
            .addCase(fetchUsuarios.fulfilled, (state, action) => {
                state.status = 'exitoso';
                state.users = action.payload;
            })
            .addCase(fetchUsuarios.rejected, (state, action) => {
                state.status = 'fallido';
                state.error = action.error.message;
            });
    },
});

export default usuariosSlice.reducer