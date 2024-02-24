import './App.css';
import { FuelHistory } from './pages/FuelHistory';
import  Nav  from './components/Nav';
import  Profile  from './pages/Profile';
import  FuelQuote  from './pages/FuelQuote';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';



function App() {
  return (
    <>
      <Nav />
      {/*<Profile/>*/}
      {/*<FuelQuote /> */}
      <FuelHistory />
      {/*<Home />*/}
      {/*<Register /> */}
      {/*<Login />*/}


    </>
  );
}


export default App;
