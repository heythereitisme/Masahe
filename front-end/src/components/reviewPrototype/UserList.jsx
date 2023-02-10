import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const UserList = ({ mt }) => {
  const [userList, setUserList] = useState([]);
  const [rating, setRating] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("");
  const [maxPages, setMaxPages] = useState(0);
  const entriesPerPage = 12;
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const un = auth.user.displayName;
  const muid = auth.muid;
  const pages = [];

  useEffect(() => {
    getUsers();
  }, [auth]);

  const getUsers = () => {
    if (auth) {
      if (mt) {
        getClients();
      } else {
        getMTs();
      }
    }
  };

  useEffect(() => {
    if (userList[0]) {
      sorter("open");
    }
  }, [userList[0]]);

  useEffect(() => {
    const filteredData = filtered();
    setFilteredUsers(filteredData);
  }, [filter]);

  const filtered = () => {
    return userList.filter((item) => {
      return (
        item.firstName.toLowerCase().includes(filter.toLowerCase()) ||
        item.lastName.toLowerCase().includes(filter.toLowerCase()) ||
        item.username.toLowerCase().includes(filter.toLowerCase())
      );
    });
  };

  const getClients = async () => {
    const req = await fetch("/api/user/client");
    const users = await req.json();
    setUserList(users);
  };

  const getMTs = async () => {
    const req = await fetch("/api/user/mt");
    const users = await req.json();
    setUserList(users);
  };

  const submitRating = (e, u) => {
    e.preventDefault();
    const uid = u._id;
    rateUser(uid);
  };

  const rateUser = async (u) => {
    const uid1 = muid;
    const uid2 = u;
    const req = await fetch("/api/rating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ratingUser: uid1,
        ratedUser: uid2,
        rating: rating,
      }),
    });
    const rate = await req.json();
    console.log("Updated average:", rate.message);
    getUsers();
  };

  const changePage = (i) => {
    const math = currentPage + i;
    if (math < 0 || math > maxPages) {
      return;
    } else {
      setCurrentPage(math);
    }
  };

  const sorter = async (f) => {
    const filteredData = filtered();
    setMaxPages(Math.ceil(filteredData.length / entriesPerPage) - 1);
    if (f === "avgRating") {
      const sort = filteredData.sort((a, b) => {
        return b[f] - a[f];
      });
      setFilteredUsers(sort);
    } else if (f === "open" || f === "licensed") {
      const sort = filteredData.sort((a, b) => {
        return b[f] - a[f];
      });
      setFilteredUsers(sort);
    } else {
      const sort = filteredData.sort((a, b) => {
        if (a.quadrant.includes(f)) {
          return -1;
        } else if (b.quadrant.includes(f)) {
          return 1;
        } else {
          return 0;
        }
      });
      setFilteredUsers(sort);
    }
  };

  const detailPage = (u) => {
    navigate(`/client/user?id=${u}`);
  };

  const mtDetailPage = (u) => {
    navigate(`/mt/user?id=${u}`);
  };

  const bookingPage = (u) => {
    navigate(`/client/booking/${u}`);
  };

  const schedulePage = (u) => {
    navigate(`/mt/schedule/${u}`);
  };

  for (let i = 0; i < filteredUsers.length; i += entriesPerPage) {
    pages.push(filteredUsers.slice(i, i + entriesPerPage));
  }

  if (mt) {
    if (!pages[0]) {
      return ( // MT none found
        <div className="bg-white">
          <div className="flex flex-col gap-5 mt-5 p-5">
            <div className="flex justify-center">
            <button
              onClick={() => schedulePage(un)}
              className="btn btn-primary w-48 h-18 font-heading font-bold text-lg bg-white text-primary hover:text-white "
            >
              
              Set Schedule
            </button>
            </div>
            <div className="flex items-center justify-center">
            <div className="flex space-x-1 m-4">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-accent bg-white border rounded-full focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-10"
                    placeholder="Search..."
                    onInput={(e) => setFilter(e.target.value)}
                />
                <button className="px-4 text-white bg-secondary rounded-full ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </div>
          </div>
          <div className="mb-10">
            <button
              className="btn btn-secondary bg-white text-primary hover:text-white mr-2 font-title"
              onClick={() => sorter("avgRating")}
            >
              Sort by rating
            </button>
            <button
              className="btn btn-secondary bg-white text-primary hover:text-white mr-2 font-title"
              onClick={() => sorter("firstName")}
            >
              Sort by first name
            </button>
            <button
              className="btn btn-secondary bg-white text-primary hover:text-white font-title"
              onClick={() => sorter("lastName")}
            >
              Sort by last name
            </button>
          </div>
          <span className="text-3xl font-heading text-primary">Not Found</span>
        </div>
      );
    } else { //MT
      return (
        <div>
          <div className="flex flex-col gap-5">
            <div className="flex justify-center mt-5 p-5">
            <button
              onClick={() => schedulePage(un)}
              className="btn btn-primary w-48 h-18 font-heading font-bold text-lg bg-white text-primary hover:text-white "
            >
              Set Schedule
            </button>
            </div>
            <div className="flex items-center justify-center">
            <div className="flex space-x-1 m-4">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-accent bg-white border rounded-full focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-10"
                    placeholder="Search..."
                    onInput={(e) => setFilter(e.target.value)}
                />
                <button className="px-4 text-white bg-secondary rounded-full ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </div>

          </div>
          <div>
            <button
              className="btn btn-secondary bg-white text-primary hover:text-white mr-2 font-title"
              onClick={() => sorter("avgRating")}
            >
              Sort by rating
            </button>
            <button
              className="btn btn-secondary bg-white text-primary hover:text-white mr-2 font-title "
              onClick={() => sorter("firstName")}
            >
              Sort by first name
            </button>
            <button
              className="btn btn-secondary bg-white text-primary hover:text-white font-title"
              onClick={() => sorter("lastName")}
            >
              Sort by last name
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-5 ">
            {pages[currentPage].map((u) => {
              return (
                <div
                  key={u.username}
                  className="bg-slate-50 shadow-2xl flex flex-col rounded-lg p-4 ml-4 mr-4 text-left "
                >
                  <span className="text-primary ml-2 mb-3 font-heading text-lg">
                  {u.firstName} {u.lastName}
                  </span>
                  <span className="text-primary ml-2">{u.username}</span>
                  <span className="text-primary ml-2">Rating: {u.avgRating} </span>
                  <div className="flex justify-center">
                    <button
                      onClick={() => detailPage(u.username)}
                      className="btn btn-primary bg-white text-primary hover:text-white mb-3 font-title"
                    >
                      Details
                    </button>
                  </div>
                  <form
                    onSubmit={(e) => submitRating(e, u)}
                    className="flex justify-between m-5 items-center"
                  >
                    
                    <div className="rating">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
</div>
     <div>
                    <button
                      type="submit"
                      className="btn btn-secondary bg-white text-primary hover:text-white font-title"
                    >
                      Submit
                    </button>
      </div>
                  </form>
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-secondary font-title mt-5"
            onClick={() => changePage(-1)}
          >
            {" "}
            Previous page
          </button>
          <button
            className="btn btn-secondary font-title ml-3"
            onClick={() => changePage(1)}
          >
            {" "}
            Next page
          </button>
        </div>
      );
    }
  } else { //client no results found
    if (!pages[0]) {
      return (
        <div >
        <div className="flex items-center ">
            <div className="flex space-x-1">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-accent bg-white border rounded-full focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-10"
                    placeholder="Search..."
                    onInput={(e) => setFilter(e.target.value)}
                />
                <button className="px-4 text-white bg-neutral rounded-full ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </div>
          <div className="mb-10">
            <button
              className="bg-red-400 hover:bg-blue-400 p-1 m-1 rounded-2xl w-24"
              onClick={() => sorter("avgRating")}
            >
              Sort by rating
            </button>
            <button
              className="bg-red-400 hover:bg-blue-400 p-1 m-1 rounded-2xl w-24"
              onClick={() => sorter("firstName")}
            >
              Sort by first name
            </button>
            <button
              className="bg-red-400 hover:bg-blue-400 p-1 m-1 rounded-2xl w-24"
              onClick={() => sorter("lastName")}
            >
              Sort by last name
            </button>
          </div>
          <span className="text-3xl">Not Found</span>
        </div>
      );
      // CLIENT
    } else {
      return (
        <div className="bg-white min-h-screen">
          <div className="flex items-center ">
            <div className="flex space-x-1 m-4">
              <input
                type="text"
                className="block w-full px-4 py-2 text-accent bg-white border rounded-full focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-10"
                placeholder="Search..."
                onInput={(e) => setFilter(e.target.value)}
              />
              <button className="px-4 text-white bg-neutral rounded-full ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="mb-10 ml-4">
            <span className="text-2xl">Sort By:</span>
            <button
              className="btn btn-secondary m-1 font-title"
              onClick={() => sorter("avgRating")}
            >
              Rating
            </button>
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-secondary m-1 font-title">
                Quadrant
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-white rounded-box w-48 text-primary"
              >
                <li>
                  <button onClick={() => sorter("NE")}>Northeast</button>{" "}
                </li>
                <li>
                  <button onClick={() => sorter("NW")}>Northwest</button>{" "}
                </li>
                <li>
                  <button onClick={() => sorter("SE")}>Southeast</button>{" "}
                </li>
                <li>
                  <button onClick={() => sorter("SW")}>Southwest</button>{" "}
                </li>
              </ul>
            </div>
            <button
              className="btn btn-secondary m-1 font-title"
              onClick={() => sorter("licensed")}
            >
              Licensed
            </button>
            <button
              className="btn btn-secondary m-1 font-title"
              onClick={() => sorter("open")}
            >
              Available
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-5">
            {pages[currentPage].map((u) => {
              const rating = Math.round(u.avgRating);
              return (
                <div
                  key={u.username}
                  className=" bg-slate-100 shadow-2xl flex flex-col rounded-lg p-4 ml-4"
                >
                  <span className="font-heading text-lg mb-3 text-primary">
                    {u.firstName} {u.lastName} 
                  </span>
                  <span className="font-title text-primary">{u.username}</span>
                  <span className="font-title text-primary">Quadrant(s):{u.quadrant.map((q) => <span className="ml-1 mr-1">{q}</span>)}</span>
                  <span className=" font-title text-primary">
                    <div className="rating">
                      <input
                        type="radio"
                        value={1}
                        className="mask mask-star-2 bg-orange-400"
                        checked={rating === 1}
                        readOnly
                      />
                      <input
                        type="radio"
                        className="mask mask-star-2 bg-orange-400"
                        value={2}
                        checked={rating === 2}
                        readOnly
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        value={3}
                        className="mask mask-star-2 bg-orange-400"
                        checked={rating === 3}
                        readOnly
                      />
                      <input
                        type="radio"
                        value={4}
                        className="mask mask-star-2 bg-orange-400"
                        checked={rating === 4}
                        readOnly
                      />
                      <input
                        type="radio"
                        value={5}
                        className="mask mask-star-2 bg-orange-400"
                        checked={rating === 5}
                        readOnly
                      />
                    </div>
                  </span>
                  {u.licensed && (
                    <span className="font-title text-primary mt-3 mb-1">
                      Licensed
                    </span>
                  )}
                  {u.open && (
                    <span className="font-title text-primary font-bold mt-3 mb-1">
                      Appointments available!
                    </span>
                  )}
                  <div className="button-holder flex justify-around ">
                    <button
                      onClick={() => mtDetailPage(u.username)}
                      className="btn btn-primary font-title bg-white text-primary"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => bookingPage(u.username)}
                      className="btn btn-primary ml-4 font-title bg-white text-primary"
                    >
                      Book
                    </button>
                    <button className=" btn btn-primary ml-4 font-title bg-white text-primary">
                      Message
                    </button>
                  </div>

                  <form
                    onChange={(e) => setRating(e.target.value)}
                    onSubmit={(e) => submitRating(e, u)}
                    className="flex justify-between m-5 items-center"
                  >
                    <div className="rating">
                      <input
                        type="radio"
                        name="rating-2"
                        value={1}
                        className="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        value={2}
                        className="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        value={3}
                        className="mask mask-star-2 bg-orange-400"
                        defaultChecked
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        value={4}
                        className="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        value={5}
                        className="mask mask-star-2 bg-orange-400"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn btn-secondary font-title"
                      >
                        Submit Rating
                      </button>
                    </div>
                  </form>
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-primary mr-4 font-title mt-5 ml-4"
            onClick={() => changePage(-1)}
          >
            {" "}
            Previous page
          </button>
          <button
            className="btn btn-primary font-title"
            onClick={() => changePage(1)}
          >
            {" "}
            Next page
          </button>
        </div>
      );
    }
  }
};
export default UserList;
