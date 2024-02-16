import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Auth/Login";
import SignUp from "./Auth/Signup";
import Home from "./Home";
import { socket, WebsocketProvider } from "../contexts/WebsocketContext";
// import PassChange from "./PassChange";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <WebsocketProvider value={socket}>
              <Home />
            </WebsocketProvider>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/passwordreset" element={<PassChange />} /> */}
      </Routes>
    </Router>
  );
}
