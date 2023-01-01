import React from "react";

const ViewMessages = ({ user, postId, token }) => {
  if (!user._id) {
    return <div></div>;
  }
  return (
    <div>
      <h3>Messages</h3>
      <ul>
        {user.messages.length ? (
          user.messages.map((message) => (
            <div key={message._id}>
              <h2>From user :{message.fromUser.username}</h2>
              <h3>Message :{message.content}</h3>
            </div>
          ))
        ) : (
          <div>
            <h2>You dont have any messages</h2>
          </div>
        )}
      </ul>
    </div>
  );
};

export default ViewMessages;
