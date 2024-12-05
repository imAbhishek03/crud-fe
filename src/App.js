// App.js
import React from "react";
import logo from "./logo.svg";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter as Router, Routes, Route, RouterProvider } from "react-router-dom";
import AddEmployee from "./employees/AddEmployee";
import LoginSignup from "./loginSignup/LoginSignup";
import Home from "./components/Home";
import Logout from "./components/Logout";
import Dashboard from "./components/Dashboard";
import Employees from "./pages/Employees";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginSignup />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/home",
      element: (
        <div>
          <Dashboard />
          <Home />
        </div>
      ),
    },
    {
      path: "/employees",
      element: (
        <div>
          <Dashboard />
          <Employees />
        </div>
      ),
    },
    {
      path: "/add-employee",
      element: (
        <div>
          <Dashboard />
          <AddEmployee />
        </div>
      ),
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />

      {/*  OR */}

      {/* <Router>
        <Dashboard />
        <Routes>
          <Route path="/" element={<LoginSignup />} />

          <Route path="/home" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
