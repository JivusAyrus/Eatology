import React from 'react';
import logo from './logo.svg';
import './App.css';
import Mynavbar from './Components/Mynavbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Components/HomePage';
import MyParticles from './Components/MyParticles'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Footer from './Components/Footer'
function App() {
  return (
    <div className="App">
      <Mynavbar/>
    </div>
  );
}

export default App;
