import { Navigate, Outlet } from "react-router-dom";
import axios, { isAxiosError } from "axios";

export default function ProtectedRoute() {
  let authStatus = false;

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
      console.log(JSON.stringify(response.data));
      authStatus = true;
    })
    .catch((error) => {
      console.log(error);
      if (isAxiosError(error) && error.response && error.response.status === 401) {
        console.log("ログイン済みユーザーのみアクセス可能なURLです。もう一度ログインしなおしてください。");
      } else {
        console.log("予期せぬエラーが発生しました。");
      }
      authStatus = false;
    });

  return authStatus ? <Outlet /> : <Navigate to="/login" />;
}
