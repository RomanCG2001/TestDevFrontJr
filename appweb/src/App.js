// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './redux/store';
import Home from './pages/Home';
import UserDetail from './pages/userDetail';

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:userId" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  </Provider>
);

export default App;

