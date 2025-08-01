import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { fetchuser } from './features/users/userSlice';
import { BrowserRouter } from 'react-router-dom';
import { fetchposts } from './features/posts/postSlice';

store.dispatch(fetchuser());
store.dispatch(fetchposts());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
