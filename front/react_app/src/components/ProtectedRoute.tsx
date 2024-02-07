import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

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

const isAuth = await authStatus();

export default function ProtectedRoute() {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
