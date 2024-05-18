import React from "react";

const SendMessageForm = ({
  message,
  setMessage,
  isSending,
  sendTextMessage,
  sendLocationMessage,
}) => {
  return (
    <form onSubmit={(e) => sendTextMessage(e)} className="w-full">
      <div className="flex w-full items-center space-x-2">
        <textarea
          className="w-4/5 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="1"
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendTextMessage(e);
            }
          }}
        ></textarea>

        <button
          type="submit"
          className="w-1/5 px-2 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
          disabled={isSending}
        >
          Send Message
        </button>

        <button
          type="button"
          className="w-1/5 px-2 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
          disabled={isSending}
          onClick={(e) => sendLocationMessage(e)}
        >
          Share Location
        </button>
      </div>
    </form>
  );
};

export default SendMessageForm;
