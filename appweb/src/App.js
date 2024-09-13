// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Home from './pages/Home';

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Home />
    </div>
  </Provider>
);

export default App;
