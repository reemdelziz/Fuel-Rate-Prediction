import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";

import { Layout } from "./components/UIcomponets/Layout";
import { LandingPage } from "./pages/LandingPage";
import { LoginForm } from "./components/UIcomponets/LoginForm";
import { RegisterForm } from './components/UIcomponets/RegisterForm';
import { FuelHistory } from './pages/FuelHistory';
import { Profile } from './pages/Profile';
import { FuelQuote } from './pages/FuelQuote';
import {Transition} from './utils/Transition';
function App() {
  const location = useLocation();

  return (<>
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<LandingPage />} />
        <Route element={<Layout />}>
          
          <Route 
            path="/login" 
            element={
              <Transition>
                <LoginForm />
              </Transition>
            } 
          />
          <Route 
            path='/register' 
            element={
              <Transition>
                <RegisterForm />
              </Transition>
            } 
          />
          <Route 
            path="/history" 
            element={
              <Transition>
                <FuelHistory />
              </Transition>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <Transition>
                <Profile />
              </Transition>
            }
          />
          <Route 
            path="/fuelquote" 
            element={
              <Transition>
                <FuelQuote />
              </Transition>
            } 
            />
        </Route>
      </Routes>
    </AnimatePresence>
  </>

  );
}

export default App;
