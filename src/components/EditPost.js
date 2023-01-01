import React, { useState } from "react";

const EditPostButton = ({ postId, token }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [location, setLocation] = useState("");

  const editPost = (postId, token) => {
    fetch(
      `http://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/posts/${postId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title: title,
            description: description,
            price: price,
            location: location,
            willDeliver: willDeliver,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        window.location.reload(false);
      })
      .catch(console.error);
  };

  return isEditing ? (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        editPost(postId, token, {
          title,
          description,
          price,
          willDeliver,
          location,
        });
      }}
    >
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
        Will Deliver:
        <select
          value={willDeliver}
          onChange={(ev) => setWillDeliver(ev.target.value)}
        >
          <option id="Yes" value={true}>
            Yes
          </option>
          <option id="No" value={false}>
            No
          </option>
        </select>
      </h3>
      <button type="submit">Save</button>
      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </form>
  ) : (
    <button onClick={() => setIsEditing(true)}>Edit Post</button>
  );
};

export default EditPostButton;
