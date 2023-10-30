import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App.js';
// import './index.css'
// import './assets/vendor/apexcharts/apexcharts.css'
// import './assets/vendor/bootstrap/css/bootstrap.min.css'
// import './assets/vendor/bootstrap-icons/bootstrap-icons.css'
// import './assets/vendor/quill/quill.snow.css'
// import './assets/vendor/quill/quill.bubble.css'
// import './assets/vendor/remixicon/remixicon.css'
// import './assets/vendor/simple-datatables/style.css'
// import 'bootstrap/dist/css/bootstrap.min.css';vd
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);


