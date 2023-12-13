import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import AlertTemplate from "react-alert-template-basic";
import { position, transitions, Provider, AlertProvider } from "react-alert";

const options = {
  timeout: 5000,
  position: position.BOTTOM_CENTER,
  transition: transitions.SCALE,
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...option}>
      <App />
    </AlertProvider>

  </Provider>,
  document.getElementById('root')
);


