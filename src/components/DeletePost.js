import React from "react";

const DeletePostButton = ({ postId, token }) => {
  const deletePost = (postId, token) => {
    console.log(token);
    fetch(
      `https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        window.location.reload(false);
      })
      .catch(console.error);
  };
  return <button onClick={() => deletePost(postId, token)}>Delete Post</button>;
};

export default DeletePostButton;
