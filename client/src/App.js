import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from "react";
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/landingPage/UIexperience/Experience';
import { ScrollControls } from '@react-three/drei';

import { Layout } from "./components/UIcomponets/Layout";
import { Home } from "./pages/Home";
import { LoginForm } from "./components/UIcomponets/LoginForm";
import { Register } from "./components/UIcomponets/RegisterForm";
import { FuelHistory } from './pages/FuelHistory';
import { Profile } from './pages/Profile';
import { FuelQuote } from './pages/FuelQuote';
import { TestHome } from './pages/TestHome';
import { Overlay } from './components/landingPage/UIexperience/Overlay';

function App() {
  return (<>
    <Canvas >
      <color attach="background" args={["#ececec"]} />
      <ScrollControls pages={10} damping={0.5}>
        <Experience />
      </ScrollControls>
    </Canvas>
    <Overlay />
    
    
    {/*<>
       
        <BrowserRouter>
          <Routes>
            <Route path = '/TestHome' element={<TestHome />} />
            <Route path='/' element={<Layout/>}>
              Routes before login 
              <Route index element={<Home />} />
              <Route path = "/loginForm" element={<LoginForm/>} />

              Routes after login 
              <Route path ="/fuelhistory" element={<FuelHistory/>}/>
              <Route path = "/profile" element={<Profile />}/>
              <Route path = "/fuelquote" element={<FuelQuote/>} />
            </Route>
          </Routes>
        </BrowserRouter>
    </>*/}
    </>
    
  );
}

export default App;
