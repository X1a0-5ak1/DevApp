import { Navigate, Outlet } from "react-router-dom";
import axios, { isAxiosError } from "axios";

const config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "http://127.0.0.1:3000/user",
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
  },
};

const authStatus = async () => {
  const resData = (await axios.request(config)).data.email;
  const tokenData = window.localStorage.getItem("email");
  const status = resData === tokenData;
  console.log(`APIDATA:${resData} LOCALDATA:${tokenData} JUDGE:${status}`);
  return status;
};

export default function ProtectedRoute() {
  // axios
  //   .request(config)
  //   .then((response) => {
  //     console.log(response.data);
  //     return response.data.email;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     if (isAxiosError(error) && error.response && error.response.status === 401) {
  //       console.log("ログイン済みユーザーのみアクセス可能なURLです。もう一度ログインしなおしてください。");
  //     } else {
  //       console.log("予期せぬエラーが発生しました。");
  //     }
  //   });

  const isAuth = await authStatus();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
