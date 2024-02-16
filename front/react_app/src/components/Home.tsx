import { useNavigate } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../contexts/WebsocketContext";

type MessagePayload = {
  content: string;
  msg: string;
};

export default function Home() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const socket = useContext(WebsocketContext);
  const navigate = useNavigate();

  // サーバー側からデータの取得
  useEffect(() => {
    socket.on("onMessage", (newMessage: MessagePayload) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("connect");
      socket.off("onMessage");
    };
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/messages");
        setMessages(response.data);
      } catch (error) {
        console.error("メッセージの取得に失敗しました。", error);
      }
    };

    fetchMessages();
  }, []);

  // メッセージの送信
  const onSubmit = () => {
    socket.emit("newMessage", value);
    setValue("");
  };

  // ログアウト
  const LogoutAction = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  // ログイン確認
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:3000/user",
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
    },
  };

  useEffect(() => {
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data) + "¥n" + "ログイン成功です。");
      })
      .catch((error) => {
        if (isAxiosError(error) && error.response && error.response.status === 401) {
          console.log("ログインしてないユーザーはこのURLにログインできません。");
          navigate("/login");
        } else {
          console.log("予期せぬエラーが発生しました。");
        }
      });
  }, []);

  return (
    <div>
      <div>
        <h1>チャットアプリ(仮)</h1>
        <div>
          <p>ようこそ「{`${window.localStorage.getItem("loginUserEmail")}`}」さん</p>
          <button onClick={LogoutAction}>logout</button>
        </div>
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
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
