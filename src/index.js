import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import { default as Post } from "./components/Post";
import { default as Login } from "./components/Login";
import { default as Register } from "./components/Register";
import { default as PostForm } from "./components/PostForm";

const App = () => {
  // Set initial state for the posts, login and register
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = window.localStorage.getItem("token");

  /// get posts and display function
  const getPosts = async () => {
    await fetch(
      "https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/posts",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts.data.posts);
        console.log(posts);
      });
  };

  //swap token for user
  const exchangeTokenForUser = () => {
    if (token) {
      setIsLoggedIn(true);
      fetch(
        "https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/me",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          const user = result.data;
          console.log(user);
          setUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  };
  // Fetch the posts when the component is mounted
  useEffect(() => {
    getPosts();
    exchangeTokenForUser();
  });

  return (
    <div>
      <h1 className="title">Strangers Things</h1>
      <nav className="links">
        <Link to="/posts">Posts ({posts.length})</Link>
        <Link to="/login">{token ? "Messages" : "Login"}</Link>
        {token ? null : <Link to="/register">Register</Link>}
      </nav>
      <Routes>
        <Route exact path="/" element={<Navigate to="/posts" />} />
        <Route
          path="/posts"
          element={
            <div>
              <Post
                posts={posts}
                setPosts={setPosts}
                isLoggedIn={isLoggedIn}
                token={token}
              />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div>
              <Login
                exchangeTokenForUser={exchangeTokenForUser}
                user={user}
                setUser={setUser}
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                getPosts={getPosts}
              />
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div>
              <Register exchangeTokenForUser={exchangeTokenForUser} />
            </div>
          }
        />
        <Route
          path="/login/postForm"
          element={<PostForm token={token} getPosts={getPosts} />}
        />
      </Routes>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
