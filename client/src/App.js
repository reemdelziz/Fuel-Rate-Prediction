import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";

import { Layout } from "./components/UIcomponets/Layout";
import { LandingPage } from "./pages/LandingPage";
import { LoginForm } from "./pages/LoginForm";
import { RegisterForm } from './pages/RegisterForm';
import { FuelHistory } from './pages/FuelHistory';
import { Profile } from './pages/Profile';
import { FuelQuote } from './pages/FuelQuote';
import { Transition } from './utils/Transition';
import { Testing } from './pages/Testing';
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

              <LoginForm />

            }
          />
          <Route
            path='/register'
            element={

              <RegisterForm />

            }
          />
          <Route
            path="/history"
            element={

              <FuelHistory />

            }
          />
          <Route
            path="/profile"
            element={

              <Profile />

            }
          />
          <Route
            path="/quote"
            element={

              <FuelQuote />

            }
          />
          <Route
            path='/testing'
            element={
              <Testing />
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  </>

  );
}

export default App;
