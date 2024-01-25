import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const LogoutAction = () => {
    window.localStorage.clear();
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
