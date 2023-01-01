import React, { useState } from "react";

const SendMessageButton = (props) => {
  const { token, postId } = props;
  const [content, setContent] = useState("");
  const [sentMessage, setSentMessage] = useState(false);

  const sendMesage = () => {
    fetch(
      `https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/posts/${postId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: {
            content: content,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
  };
  return sentMessage ? (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        sendMesage(token, postId);
      }}
    >
      <h2>Send a message</h2>
      <input
        placeholder="Type message here"
        onChange={(ev) => setContent(ev.target.value)}
        value={content}
      ></input>
      <button type="submit">Send Message</button>
      <button onClick={() => setSentMessage(false)}>Cancel Message</button>
    </form>
  ) : (
    <button onClick={() => setSentMessage(true)}>Send Message</button>
  );
};

export default SendMessageButton;
