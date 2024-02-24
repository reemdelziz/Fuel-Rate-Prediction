import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { LoginForm } from "./components/LoginForm";
import { Register } from "./components/RegisterForm";
import { FuelHistory } from './pages/FuelHistory';
import { Profile } from './pages/Profile';
import { FuelQuote } from './pages/FuelQuote';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            {/*Routes before login */}
            <Route index element={<Home />} />
            <Route path = "/loginForm" element={<LoginForm/>} />


            {/* Routes after login */}
            <Route path ="/fuelhistory" element={<FuelHistory/>}/>
            <Route path = "/profile" element={<Profile />}/>
            <Route path = "/fuelquote" element={<FuelQuote/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
