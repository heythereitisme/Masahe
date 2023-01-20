import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReviewPrototype = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
        firstName: firstName,
        lastName: lastName,
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
  
  const bookingPage = (u) => {
    navigate(`/client/booking/${u}`)
  }

  return (
    <div>
      <form onSubmit={formSubmit} className="flex flex-col bg-red-200 w-80 mx-auto mt-3 rounded-lg">
        <span>Create User</span>
        <input
          type="text"
          placeholder="first name"
          onInput={(e) => setFirstName(e.target.value)}
          className="p-1 m-1"
        />
        <input
          type="text"
          placeholder="first name"
          onInput={(e) => setLastName(e.target.value)}
          className="p-1 m-1"
        />
        <button type="submit" className="bg-red-400 hover:bg-blue-400 p-1 m-1 rounded-2xl" >Create</button>
      </form>
      <div className="grid grid-cols-4 gap-2 mt-5">
        {userList.map((u) => {
          return (
            <div key={u._id} className="bg-purple-200 flex flex-col rounded-lg">
              <span>
                Name: {u.firstName} {u.lastName}
              </span>
              <span>Rating: {u.avgRating} </span>
              <div className="button-holder">
                <button onClick={() => detailPage(u._id)} className='bg-red-400 hover:bg-blue-400 p-1 m-1 rounded-2xl'>Details</button>
                <button onClick={() => bookingPage(u._id)} className='bg-red-400 hover:bg-blue-400 p-1 m-1 rounded-2xl'>Book</button>
                <button onClick={() => deleteUser(u)} className='bg-red-400 hover:bg-blue-400 p-1 m-1 rounded-2xl'>Delete</button>
              </div>
              <form onSubmit={(e) => submitRating(e, u)} className='container mx-auto'>
                <input
                  type="text"
                  placeholder="enter rating number"
                  onInput={(e) => setRating(e.target.value)}
                  className='w-1/2'
                />
                <button type="submit" className='bg-red-400 hover:bg-blue-400 p-1 m-1 rounded-2xl'>Submit Rating</button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewPrototype;
