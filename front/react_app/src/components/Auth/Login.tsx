import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ReactNode, useState } from "react";
import { Container, InputUserInfo, Form, ErrorMessages, PasswordResetLink, LoginButton } from "../styles/Login.style";
import axios from "axios";
// import qs from "qs";

type LoginForm = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });

  const onSubmit = async (data: LoginForm) => {
    console.log(data);
    // axios
    //   .post("http://127.0.0.1:3000/auth/login", {
    //     body: {
    //       email: data.email,
    //       password: data.password,
    //     },
    //   })
    //   .then((response) => {
    //     if (response.data.status) {
    //       alert("login success!!");
    //       console.log(response.data.token);
    //       window.localStorage.setItem(data.email, response.data.token);
    //       navigate("/home");
    //     } else {
    //       setErrorMsg("ユーザー名またはパスワードが違います");
    //     }
    //   })
    //   .catch((error) => {
    //     alert(`予期せぬエラーが発生しました。${error}`);
    //   });

    // const queryData = qs.stringify({
    //   email: data.email,
    //   password: data.password,
    // });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:3000/auth/login",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: { email: data.email, password: data.password },
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        window.localStorage.setItem("accessToken", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg("ログイン失敗");
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <ErrorMessages>{errorMsg}</ErrorMessages>
        <label>
          <InputUserInfo
            type="text"
            {...register("email", { required: "ユーザーIDを入力してください。" })}
            placeholder="example@raft-works.com"
          />
        </label>
        <ErrorMessages>{errors.email?.message as ReactNode}</ErrorMessages>
        <label>
          <InputUserInfo
            type="password"
            {...register("password", { required: "パスワードを入力してください。" })}
            placeholder="Enter Password"
          />
        </label>
        <ErrorMessages>{errors.password?.message as ReactNode}</ErrorMessages>
        <PasswordResetLink
          onClick={() => {
            navigate("/passwordreset");
          }}>
          Forgot Password...?
        </PasswordResetLink>
        <LoginButton type="submit" onSubmit={handleSubmit(onSubmit)}>
          Login
        </LoginButton>
      </Form>
    </Container>
  );
}
export default Login;
