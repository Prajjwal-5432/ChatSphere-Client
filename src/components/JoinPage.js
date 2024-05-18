import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const JoinPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    roomName: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.userName.length < 4) {
      enqueueSnackbar("Username should atleast be more than 3 characters", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }
    if (user.roomName.length < 4) {
      enqueueSnackbar("Room name should atleast be more than 3 characters", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }
    // navigate("/chat");
    navigate(`/chat?user=${user.userName}&room=${user.roomName}`);
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="w-2/3 banner pl-9 border-gray-400 flex flex-col justify-evenly p-4">
        <p className="text-8xl mb-4">ChatSphere</p>
        <p className="text-4xl mb-2">
          Where the world meets in real-time conversations.
          <br /> Join now and make your voice heard!
        </p>
        <p className="text-4xl">Connect globally, chat locally</p>
      </div>
      <div className="w-1/3 join-form flex flex-col justify-center items-center">
        <h2 className="text-3xl mb-4">Join Chat Room</h2>
        <form className="w-3/4" onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label htmlFor="displayName" className="block text-xl mb-2">
              User Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={user.userName}
              onChange={(e) => handleChange(e)}
              required
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="roomName" className="block text-xl mb-2">
              Room Name
            </label>
            <input
              type="text"
              id="roomName"
              name="roomName"
              value={user.roomName}
              onChange={(e) => handleChange(e)}
              required
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinPage;
