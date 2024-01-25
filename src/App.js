import React from 'react';
import Home from "./components/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div>
      <ToastContainer />
      <Home />
    </div>
  );
};

export default App;
