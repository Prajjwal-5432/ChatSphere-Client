import React from "react";
import moment from "moment";

const Message = ({ message, user }) => {
  const { text, type, createdAt } = message;
  const sameUser = message.username === user.username;
  return (
    <div
      className={`flex w-full ${
        type === "access"
          ? "justify-center"
          : sameUser
          ? "justify-end"
          : "justify-start"
      } my-2`}
    >
      <div className="bg-gray-100 rounded-md p-2">
        <p className="text-xs">{type !== "access" ? message.username : ""}</p>
        <p className="text-gray-800">
          {type === "text" || type === "access" ? (
            <>{text}</>
          ) : (
            <a
              href={text}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              My current location
            </a>
          )}
          {"   "}
          {type !== "access" && (
            <span className="text-xs text-gray-600">
              {moment(createdAt).format("LT")}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Message;
