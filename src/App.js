import logo from "./logo.svg";
import "./App.css";
import Navbar from "./layout/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEmployee from "./employees/AddEmployee";
import LoginSignup from './loginSignup/LoginSignup'

function App() {
  return (
    <div className="App">
      <LoginSignup />
      {/* <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addemployee" element={<AddEmployee />} />
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
