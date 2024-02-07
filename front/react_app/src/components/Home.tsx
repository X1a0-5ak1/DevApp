import { useNavigate } from "react-router-dom";
import axios, { isAxiosError } from "axios";

export default function Home() {
  const navigate = useNavigate();

  const LogoutAction = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:3000/user",
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data) + "¥n" + "ログイン成功です。");
    })
    .catch((error) => {
      if (isAxiosError(error) && error.response && error.response.status === 401) {
        console.log("ログインしてないユーザーはこのURLにログインできません。");
      } else {
        console.log("予期せぬエラーが発生しました。");
      }
      navigate("/login");
    });

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
