import React, { useEffect, useRef } from "react";

const MessageContainer = ({ messages }) => {
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  return (
    <div ref={messageRef} className="message-container" style={{width: "80%", backgroundColor: "lightgray"}}>
      {messages.map((m, index) => (
        <div key={index} className="user-message">
          <div className="message">{m.message}</div>
          <div className="from-user">{m.user}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
