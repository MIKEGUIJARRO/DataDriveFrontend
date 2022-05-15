import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { UserProvider } from './context/userContext';
import { ModalProvider } from './context/modalContex';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);