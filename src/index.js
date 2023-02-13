import React from "react";
import {BrowserRouter} from 'react-router-dom';
import {createRoot} from "react-dom/client";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
process.env.PARCEL_WORKERS = 2; 

const root = createRoot(document.getElementById('root'));
root.render(<BrowserRouter>
  <App/></BrowserRouter>);
// root.render(<div><h1>Hello World</h1></div>)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
