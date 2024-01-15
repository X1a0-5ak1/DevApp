import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Auth/Login";
import Home from "./home/Home";
// import PassChange from "./PassChange";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/passwordreset" element={<PassChange />} /> */}
      </Routes>
    </Router>
  );
}
export default App;
