import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const ReviewPrototype = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [userList, setUserList] = useState([]);
  const [rating, setRating] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const req = await fetch("/api/user/client");
    const users = await req.json();
    setUserList(users);
  };

  const addUser = async () => {
    const req = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstname,
        lastName: lastname,
      }),
    });
    const newUser = await req.json();
    console.log(newUser.firstName, "added");
    getUsers();
  };

  const formSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  const deleteUser = async (u) => {
    const req = await fetch("/api/user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: u._id,
      }),
    });
    console.log(u.firstName, "deleted");
    getUsers();
  };

  const submitRating = (e, u) => {
    e.preventDefault();
    const uid = u._id
    rateUser(uid);
  };

  const rateUser = async(u) => {
    const uid1 = "63bb70be2b36096377a55d54"
    const uid2 = u
    const req = await fetch("/api/rating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ratingUser: uid1,
        ratedUser: uid2,
        rating: rating
      }),
    });
    const rate = await req.json()
    console.log("Updated average:", rate.message)
    getUsers()
  };

  const detailPage = (u) => {
    navigate(`/client/user?id=${u}`)
  } 

  return (
    <div>
      <form onSubmit={formSubmit} className="user-creation-form">
        <span>Create User</span>
        <input
          type="text"
          placeholder="first name"
          onInput={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="first name"
          onInput={(e) => setLastname(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
      <div className="user-collection">
        {userList.map((u) => {
          return (
            <div key={u._id} className="user-box">
              <span>
                Name: {u.firstName} {u.lastName}
              </span>
              <span>Rating: {u.avgRating} </span>
              <div className="button-holder">
                <button onClick={() => detailPage(u._id)}>Details</button>
                <button onClick={() => deleteUser(u)}>Delete</button>
              </div>
              <form onSubmit={(e) => submitRating(e, u)}>
                <input
                  type="text"
                  placeholder="enter rating number"
                  onInput={(e) => setRating(e.target.value)}
                />
                <button type="submit">Submit Rating</button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewPrototype;
