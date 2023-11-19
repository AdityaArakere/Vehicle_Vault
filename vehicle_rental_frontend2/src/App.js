import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Car from './pages/Car';
import Login from './components/Login';

function App() 
{
  return(
    <BrowserRouter>
      <div className='App'>
        <Navbar/>
        
    
    
      </div>
      <div className='page_view'>
          <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/Cars' element={<Car/>} />
              <Route path='/Login' element={<Login/>}/>
              <Route path='/Excercises'/>
              <Route path='/Admin' />
              

              
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
