import React, { useState } from "react";

const Register = (props) => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  // const [user, setUser] = useState({});

  const register = (ev) => {
    ev.preventDefault();
    fetch(
      "https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: registerUsername,
            password: registerPassword,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) {
          throw result.error;
        }
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form className="displayRegisterForm" onSubmit={register}>
        <input
          placeholder="username"
          value={registerUsername}
          onChange={(ev) => setRegisterUsername(ev.target.value)}
        />
        <input
          placeholder="password"
          value={registerPassword}
          type="password"
          onChange={(ev) => setRegisterPassword(ev.target.value)}
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
