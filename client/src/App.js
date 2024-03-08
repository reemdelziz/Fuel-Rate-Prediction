import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from "react";

import { Layout } from "./components/UIcomponets/Layout";
import { Home } from "./pages/Home";
import { LoginForm } from "./components/UIcomponets/LoginForm";
import { RegisterForm } from './components/UIcomponets/RegisterForm';
import { UserEntry } from './components/UIcomponets/UserEntry';
import { FuelHistory } from './pages/FuelHistory';
import { Profile } from './pages/Profile';
import { FuelQuote } from './pages/FuelQuote';





function App() {

  return (<>
    <Routes>
      
      <Route path='/' element={<Layout />} />
        Routes before login
      <Route index element={<Home />} />
      <Route path = "/userEntry"element={<UserEntry />}/>
      <Route path="/loginForm" element={<LoginForm />} />
      <Route path='/registerForm' element={<RegisterForm />} />
      Routes after login
      <Route path="/fuelhistory" element={<FuelHistory />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/fuelquote" element={<FuelQuote />} />
    </Routes>
  </>

  );
}

export default App;
