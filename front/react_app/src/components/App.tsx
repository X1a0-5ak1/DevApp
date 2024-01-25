import React from "react";
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import Login from "./Auth/Login";
import SignUp from "./Auth/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";

const App: React.FC = () => {
  return (
    <Router basename="/Raft-works.Chat-App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/passwordreset" element={<PassChange />} /> */}
        <Navigate to="/" />
      </Routes>
    </Router>
  );
};
export default App;
