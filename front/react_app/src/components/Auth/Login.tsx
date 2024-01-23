import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ReactNode, useState } from "react";
import { Container, InputUserInfo, Form, ErrorMessages, NavigateLink, SubmitButton } from "../styles/AuthForm.style";
import axios, { isAxiosError } from "axios";
// import React from "react";
// import qs from "qs";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });

  const onSubmit = async (data: LoginForm) => {
    console.log(data);

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
        if (isAxiosError(error) && error.response && error.response.status === 403) {
          console.log(error);
          setErrorMsg("Emailまたはパスワードが違います");
        } else {
          console.log(error);
          setErrorMsg("予期せぬエラーが発生しました");
        }
      });

    if (window.localStorage.getItem("accessToken")) {
      navigate("/home");
    }
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
        <NavigateLink
          onClick={() => {
            navigate("/passwordreset");
          }}>
          Forgot Password...?
        </NavigateLink>
        <NavigateLink
          onClick={() => {
            navigate("/signup");
          }}>
          Create your Account!!
        </NavigateLink>
        <SubmitButton type="submit" onSubmit={handleSubmit(onSubmit)}>
          Login
        </SubmitButton>
      </Form>
    </Container>
  );
}
