import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from './Hero/Hero';
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
