import './App.css';
import { FuelHistory } from './pages/FuelHistory';
import { Nav } from './components/Nav';
import { Profile } from './pages/Profile';
import { FuelQuote } from './pages/FuelQuote';


function App() {
  return (
    <>
      <Nav />
      {/*<Profile/>*/}
      {/*<FuelQuote />*/}
      <FuelHistory />
    </>
  );
}

export default App;
