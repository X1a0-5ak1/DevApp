import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ReactNode, useState } from "react";
import styled from "styled-components";

type LoginForm = {
  userid: string;
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
    axios
      .get("http://192.168.56.1:3001/api/login", {
        params: {
          userid: data.userid,
          password: data.password,
        },
      })
      .then((response) => {
        if (response.data.status) {
          alert("login success!!");
          console.log(response.data.token);
          window.localStorage.setItem(data.userid, response.data.token);
          navigate("/home");
        } else {
          setErrorMsg("ユーザー名またはパスワードが違います");
        }
      })
      .catch((error) => {
        alert(`予期せぬエラーが発生しました。${error}`);
      });
  };

  //スタイル定義

  const InputUserInfo = styled.input`
    text-align: left;
    width: 200px;
    padding: 10px;
    margin-bottom: 5px;
    border: 2px solid #007bff; /* 鮮やかなボーダー色 */
    border-radius: 8px; /* 角丸 */
    background-color: #f0f8ff; /* 明るい背景色 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 影の追加 */
    display: flex;

    &:focus {
      border-color: #ff4500; /* フォーカス時にボーダー色を変更 */
      box-shadow: 0 0 8px rgba(255, 69, 0, 0.6); /* フォーカス時に影を強調 */
      outline: none; /* デフォルトのアウトラインを削除 */
    }

    &:hover {
      background-color: #e0ffff; /* ホバー時の背景色変更 */
    }
  `;

  const LoginButton = styled.button`
    width: 210px;
    padding: 10px;
    margin-top: 10px;
    background-color: #007bff; /* ボタンの背景色 */
    color: white; /* テキストの色 */
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease; /* トランジション効果 */

    &:hover {
      background-color: #0056b3; /* ホバー時の背景色変更 */
    }
  `;

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 98vh;
    background-size: 100%;
    background-image: url(https://images4.alphacoders.com/132/1321259.png); /* 背景色 */
  `;

  const Form = styled.form`
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    text-align: center;
    align-items: center;
    justify-content: center;
  `;

  const PasswordResetLink = styled.a`
    max-width: 78px;
    font-size: 8px;
    color: blue;
    display: flex;
    text-decoration: underline;

    &:hover {
      color: red;
    }
  `;

  const ErrorMessages = styled.p`
    font-size: 8px;
    color: red;
    display: flex;
  `;

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <ErrorMessages>{errorMsg}</ErrorMessages>
        <label>
          <InputUserInfo
            type="text"
            {...register("userid", { required: "ユーザーIDを入力してください。" })}
            placeholder="example@raft-works.com"
          />
        </label>
        <ErrorMessages>{errors.userid?.message as ReactNode}</ErrorMessages>
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
