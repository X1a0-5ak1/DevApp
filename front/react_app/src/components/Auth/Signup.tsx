import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ReactNode, useState } from "react";
import {
  Container,
  InputUserInfo,
  Form,
  ErrorMessages,
  NavigateLink,
  SubmitButton,
  PasswordReveal,
} from "../styles/AuthForm.style";
import axios, { isAxiosError } from "axios";
// import qs from "qs";

type SignUpForm = {
  email: string;
  password: string;
};

export default function SignUp() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({ mode: "onChange" });

  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  };

  const onSubmit = async (data: SignUpForm) => {
    console.log(data);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:3000/auth/signup",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: { email: data.email, password: data.password },
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        alert(`登録完了:${response.data.message}`);
      })
      .catch((error) => {
        if (isAxiosError(error) && error.response && error.response.status === 403) {
          console.log(error);
          setErrorMsg("登録済みのEmailです");
        }
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign Up</h2>
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
            type={isRevealPassword ? "text" : "password"}
            {...register("password", { required: "パスワードを入力してください。" })}
            placeholder="Enter Password"
          />
          <PasswordReveal onClick={togglePassword} role="presentation">
            {isRevealPassword ? <i className="fas fa-eye" /> : <i className="fas fa-eye-slash" />}
          </PasswordReveal>
        </label>
        <ErrorMessages>{errors.password?.message as ReactNode}</ErrorMessages>
        <NavigateLink
          onClick={() => {
            navigate("/login");
          }}>
          Go to Login!!
        </NavigateLink>
        <SubmitButton type="submit" onSubmit={handleSubmit(onSubmit)}>
          Create User
        </SubmitButton>
      </Form>
    </Container>
  );
}
