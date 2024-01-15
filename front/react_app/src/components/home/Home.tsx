import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const LogoutAction = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <button id="fakeButton" onClick={() => alert("ログイン完了なりよ☆")}>
        (´・ω・｀)
      </button>
      <button id="logoutButton" onClick={LogoutAction}>
        LOGOUT
      </button>
    </>
  );
}
export default Home;
