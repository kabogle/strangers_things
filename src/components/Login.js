import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { default as ViewMessages } from "./Messages";

const Login = (props) => {
  const exchangeTokenForUser = props.exchangeTokenForUser;
  const token = props.token;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser, isLoggedIn, setIsLoggedIn, getPosts } = props;
  const navigate = useNavigate();

  const login = (ev) => {
    ev.preventDefault();
    console.log("login");
    fetch(
      "https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) {
          throw result.error;
        }
        const token = result.data.token;
        window.localStorage.setItem("token", token);
        exchangeTokenForUser();
        getPosts();
        console.log(user);
        setIsLoggedIn(true);
        navigate("/posts");
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setUser({});
    window.location.reload(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome Stranger {user.username}!</h1> <br />
          <button onClick={(ev) => navigate("./postForm")}>Make a post</button>
          <button onClick={logout}> Logout </button>
          <section>
            <ViewMessages token={token} user={user} />
          </section>
        </div>
      ) : null}
      {!isLoggedIn ? (
        <div>
          <form className="displayLoginForm" onSubmit={login}>
            <input
              placeholder="username"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
            <input
              placeholder="password"
              value={password}
              type="password"
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button disabled={!username || !password}>Login</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Login;
