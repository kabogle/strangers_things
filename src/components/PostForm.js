import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostForm = (props) => {
  const { token, getPosts } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [location, setLocation] = useState("");

  const createPostForm = ({
    token,
    title,
    description,
    price,
    willDeliver,
    location,
  }) => {
    fetch(
      "https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title,
            description,
            price,
            willDeliver,
            location,
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

  const navigate = useNavigate();

  const submitPost = (ev) => {
    ev.preventDefault();
    createPostForm({ token, title, description, price, willDeliver, location });
    getPosts();
    navigate("/posts");
  };

  return (
    <div>
      <form onSubmit={(ev) => submitPost(ev)}>
        <h3>
          Title:{" "}
          <input
            placeholder=""
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </h3>
        <h3>
          Description:{" "}
          <input
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
        </h3>
        <h3>
          Price:{" "}
          <input value={price} onChange={(ev) => setPrice(ev.target.value)} />
        </h3>
        <h3>
          Location:{" "}
          <input
            value={location}
            onChange={(ev) => setLocation(ev.target.value)}
          />
        </h3>
        <h3>
          Will Deliver:{" "}
          <select>
            <option
              id="Yes"
              value={true}
              onChange={(ev) => setWillDeliver(ev.target.value)}
            >
              Yes
            </option>

            <option
              id="No"
              value={false}
              onChange={(ev) => setWillDeliver(ev.target.value)}
            >
              No
            </option>
          </select>
        </h3>
        <button>Submit Post</button>
      </form>
    </div>
  );
};

export default PostForm;
