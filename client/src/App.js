import './App.css';
import { Routes } from "./routes/Routes";
import { AnimatePresence } from "framer-motion";


function App() {
  return (
      <AnimatePresence mode='wait'>
        <Routes />
      </AnimatePresence>
  );
}

export default App;
