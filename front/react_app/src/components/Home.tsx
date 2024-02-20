import { useNavigate } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import { ReactNode, useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../contexts/WebsocketContext";
import { HeaderItems, ActionButton, ErrorMessages } from "./styles/ChatForm.style";
import { SubmitHandler, useForm } from "react-hook-form";

type MessagePayload = {
  content: string;
  msg: string;
  user_Id: number;
  createdAt: Date;
};

export default function Home() {
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const socket = useContext(WebsocketContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessagePayload>({ mode: "onChange" });

  // イベントの受信
  useEffect(() => {
    socket.on("onMessage", (newMessage: MessagePayload) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("connect");
      socket.off("onMessage");
    };
  });

  // メッセージの送信
  const onSubmit: SubmitHandler<MessagePayload> = (data) => {
    socket.emit("newMessage", data.msg);
  };

  // ログアウト
  const LogoutAction = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  // ログイン確認
  useEffect(() => {
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
        window.localStorage.setItem("user_Id", response.data.id);
        socket.on("loadMessage", (newMessage: MessagePayload) => {
          setMessages((prev) => [...prev, newMessage]);
        });

        return () => {
          socket.off("connect");
          socket.off("loadMessage");
        };
      })
      .catch((error) => {
        if (isAxiosError(error) && error.response && error.response.status === 401) {
          console.log("ログインしてないユーザーはこのURLにログインできません。");
          navigate("/login");
        } else {
          console.log("予期せぬエラーが発生しました。");
        }
      });
    reset();
  });

  return (
    <div>
      <HeaderItems>
        <p>ようこそ「{`${window.localStorage.getItem("loginUserEmail")}`}」さん</p>
        <ActionButton onClick={LogoutAction}>logout</ActionButton>
      </HeaderItems>
      <div>
        <h1>チャットアプリ(仮)</h1>

        <div>
          {messages.length === 0 ? (
            <div>未だメッセージがありません。</div>
          ) : (
            <div>
              {messages.map((msg, idx) => (
                <div key={idx}>
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <input
            type="text"
            {...register("msg", { required: "メッセージを入力してください" })}
            placeholder="メッセージを入力"
          />
          <ErrorMessages>{errors.msg?.message as ReactNode}</ErrorMessages>
          <button type="submit" onClick={handleSubmit(onSubmit)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
