import React, { Fragment } from "react";
import { default as DeletePostButton } from "./DeletePost";
import { default as EditPostButton } from "./EditPost";
import { default as SendMessageButton } from "./SendMessage";
import { useNavigate } from "react-router-dom";

const Post = (props) => {
  // Set initial state for the posts
  const { posts, token } = props;
  const navigate = useNavigate();

  // Fetch the posts when the component is mounted
  if (!posts) {
    return <main></main>;
  }
  return (
    <main>
      <div>
        <h1>Posts</h1>
        <button onClick={(ev) => navigate("/login/postForm")}>
          Make a post
        </button>
        {posts.length
          ? posts.map((post) => {
              return (
                <div
                  className={
                    post.isAuthor ? "displayPosts myPost" : "displayPosts"
                  }
                  key={post._id}
                >
                  <h2> {post.title} </h2>
                  <h3>From: {post.author.username} </h3>
                  <h3>Description:{post.description} </h3>
                  <h3>Price: {post.price} </h3>
                  <h3>Location: {post.location} </h3>
                  <h3>Will deliver: {post.willDeliver ? "Yes" : "No"}</h3>
                  {post.isAuthor ? (
                    <DeletePostButton postId={post._id} token={token} />
                  ) : null}
                  {post.isAuthor ? (
                    <EditPostButton postId={post._id} token={token} />
                  ) : null}
                  {post.isAuthor ? null : (
                    <SendMessageButton postId={post._id} token={token} />
                  )}
                </div>
              );
            })
          : null}
      </div>
    </main>
  );
};
export default Post;
