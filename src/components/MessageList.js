import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";

const MessageList = ({ messages, user }) => {
  const messagesContainerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    const container = messagesContainerRef.current;

    const handleScroll = () => {
      if (container) {
        const threshold = 100; // Pixels from the bottom to consider as "at the bottom"
        const isNearBottom =
          container.scrollHeight -
            container.scrollTop -
            container.clientHeight <
          threshold;
        setIsAtBottom(isNearBottom);
      }
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    if (isAtBottom && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isAtBottom]);
  return (
    <div
      ref={messagesContainerRef}
      className="messages flex flex-col flex-grow-[5000] overflow-scroll border border-gray-500 p-4 mt-4"
    >
      {messages?.map((message, ind) => (
        <Message key={ind} message={message} user={user} />
      ))}
    </div>
  );
};

export default MessageList;
