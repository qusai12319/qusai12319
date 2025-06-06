import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { UserContextProvider } from './context/userContext.component';

import { CartProvider } from './context/cart.context';
import {Provider} from 'react-redux'
import { store } from './store/store';


// Create a history instance
const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>

   
    <HistoryRouter
      history={history}
      unstable_future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <UserContextProvider>
        
          <CartProvider>
            <App  />
          </CartProvider>
        
      </UserContextProvider>
    </HistoryRouter>
     </Provider>
  </React.StrictMode>
);

reportWebVitals();
