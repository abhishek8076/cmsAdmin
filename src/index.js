import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App.js';
import $ from "jquery";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter } from 'react-router-dom';
import 'https://code.jquery.com/jquery-3.4.1.min.js';
import './assets/js/main.js'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);


