import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";


function ClientNavbar() {
  const auth = useContext(AuthContext);
  const ava = auth.avatar;
  const logOut = auth.logout;

  return (
    <div className="navbar bg-primary drop-shadow-lg">
      <div className="navbar-start">
        <div className="dropdown z-10">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52"
          >
            <li className=" font-heading text-primary">
              <Link to="/client">Home</Link>
            </li>
            <li>
              <Link to="/client/booking"> Booking </Link>{" "}
              <li>
            <Link to="/aboutus" className=" font-heading">
              About Us
            </Link>
          </li>
            </li>
          </ul>
        </div>
        <ul>
          {" "}
          <Link to="/">
            <div className="btn bg-primary btn-primary">
              <img src="/Masahe-White-H.svg" className="w-32 m-1 rounded-lg " alt="" />
            </div>
          </Link>
        </ul>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white">
          <li>
            <Link to="/client" className=" font-heading">
              Home
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/client/booking" className=" font-heading">
              {" "}
              Booking{" "}
            </Link>{" "}
          </li>
          <li>
            <Link to="/client/services" className=" font-heading">
              {" "}
              Services{" "}
            </Link>{" "}
          </li>
          <li>
            <Link to="/aboutus" className=" font-heading">
              About Us
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <div className="dropdown dropdown-end mr-2">
          <label tabIndex={0} className="btn btn-primary">
            <img src={ava} alt="avatar" className="h-12 rounded-full " />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 text-primary"
          >
            <li>
              <Link to="profile">Profile</Link>
            </li>
            <li>
              <button onClick={logOut}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ClientNavbar;
