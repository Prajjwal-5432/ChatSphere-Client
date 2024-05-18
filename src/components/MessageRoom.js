import { useEffect, useState } from "react";
import SendMessageForm from "./SendMessageForm";
import MessageList from "./MessageList";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useSocket } from "./SocketContext";
import Sidebar from "./Sidebar";

const MessageRoom = () => {
  const { enqueueSnackbar } = useSnackbar();

  const socket = useSocket();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [roomData, setRoomData] = useState({});
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get("user");
  const room = params.get("room");

  useEffect(() => {
    if (socket) {
      socket.on("message", (msg) => {
        setMessages((m) => [...m, msg]);
      });

      socket.on("roomData", ({ room, users }) => {
        setRoomData({
          room,
          users,
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket && username && room) {
      socket.emit("join", username, room, ({ user, error }) => {
        if (error) {
          enqueueSnackbar(error, {
            variant: "error",
            autoHideDuration: 2000,
          });
          navigate("/");
        }
        setUser(user);
      });
    } else {
      if (!socket) {
        enqueueSnackbar("Enter through the Join Page", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
      if (!username || !room) {
        enqueueSnackbar("Enter the details correctly", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }

      navigate("/");
    }
  }, [socket]);

  const sendTextMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      setMessage("");
      return;
    }
    setIsSending(true);
    socket.emit("sendMessage", message, (error) => {
      setMessage("");
      setIsSending(false);
      if (error) {
        enqueueSnackbar(error, {
          variant: "error",
          autoHideDuration: 2000,
        });
        return console.log(error);
      }
    });
  };
  const sendLocationMessage = (e) => {
    e.preventDefault();
    if (!navigator.geolocation) {
      return alert("Geolocation not supported by this browser");
    }
    setIsSending(true);
    navigator.geolocation.getCurrentPosition((position) => {
      socket.emit(
        "sendLocation",
        position.coords.latitude,
        position.coords.longitude,
        () => {
          setIsSending(false);
        }
      );
    });
  };
  return (
    <div>
      <div className="h-screen w-screen flex flex-row">
        <div className="w-1/5 border border-gray-500 p-4">
          <Sidebar roomName={roomData.room} users={roomData.users} />
        </div>
        <div className="w-4/5 border border-gray-500 p-4 flex flex-col gap-2">
          <MessageList messages={messages} user={user} />
          <div className="flex flex-grow-[1] border border-gray-500 p-4">
            <SendMessageForm
              message={message}
              setMessage={setMessage}
              isSending={isSending}
              sendLocationMessage={sendLocationMessage}
              sendTextMessage={sendTextMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageRoom;
