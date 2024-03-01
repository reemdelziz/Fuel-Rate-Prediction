import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {useEffect} from "react";
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/landingPage/UIexperience/Experience';
import { Loader, ScrollControls } from '@react-three/drei';
import { Overlay } from './components/landingPage/UIexperience/Overlay';
import { usePlay } from './components/landingPage/UIexperience/Play';
import { Gradient } from "./assets/gradient";

import { Layout } from "./components/UIcomponets/Layout";
import { Home } from "./pages/Home";
import { LoginForm } from "./components/UIcomponets/LoginForm";
import { Register } from "./components/UIcomponets/RegisterForm";
import { FuelHistory } from './pages/FuelHistory';
import { Profile } from './pages/Profile';
import { FuelQuote } from './pages/FuelQuote';
import { TestHome } from './pages/TestHome';



function App() {
  const { play, end } = usePlay();
  useEffect(() => {
		const gradient = new Gradient();
		gradient.initGradient("#gradient-canvas");
	}, []);
  return (<>
    <canvas
				id="gradient-canvas"
				className="fixed inset-0"
				data-transition-in
			/>
    {/*<>
    <Canvas >
      <color attach="background" args={["#ececec"]} />
      <ScrollControls
        pages={play && !end ? 10 : 0}
        damping={0.5}
        style={{
          top: "10px", left: "0px",
          bottom: "10px",
          right: "10px",
          width: "auto",
          height: "auto",
          animation: "fadeIn 2.4s ease-in-out 1.2s forwards",
          opacity: 0,
        }}
      >
        <Experience />
      </ScrollControls>
    </Canvas>
    <Loader />
    <Overlay />
    
      </>*/}

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
