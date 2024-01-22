import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Auth/Login";
import SignUp from "./Auth/Signup";
import Home from "./home/Home";
// import PassChange from "./PassChange";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/passwordreset" element={<PassChange />} /> */}
      </Routes>
    </Router>
  );
}
