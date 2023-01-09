import React, { useState, useEffect } from "react";
import "./style.css";

const ReviewPrototype = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const req = await fetch("/api/user");
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
    getUsers()
  };

  const formSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  const deleteUser = async(u) => {
    const req = await fetch("/api/user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: u._id
      }),
    });
    console.log(u.firstName, "deleted")
    getUsers()
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
          return(
            <div key={u._id} className="user-box">
              <span>Name: {u.firstName} {u.lastName}</span>
              <button onClick={() => deleteUser(u)}>Delete</button>
            </div>
              )
        })}
      </div>
    </div>
  );
};

export default ReviewPrototype;
