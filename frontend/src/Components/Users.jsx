import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { NavLink } from "react-router-dom";
import "../Styles/Users.css";
import axios from "axios";
import Loader from "../Loaders/Loader";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [len, setLen] = useState(0);
  useEffect(() => {
    setLen(users.length);
    axios
      .get("http://localhost:4000")
      .then((user) => {
        setUsers(user.data);
        setLen(1);
      })
      .catch((err) => console.log(err));
  }, [users]);
  // !! One way Of Deleting user
  const deleteUser = (e, id) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      axios
        .delete("http://localhost:4000/deleteUser/" + id)
        .then(() => {
          toast.success("Deleted successfully!", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
          setTimeout(() => {
            navigate("/");
          }, 1200);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="container">
        <div className="table-wrapper">
          <NavLink to="/create">
            <button className="add_btn">Add+</button>
          </NavLink>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {len == 0 ? (
                <tr>
                  <td>
                    <p className="nousers">No users found</p>
                  </td>
                </tr>
              ) : (
                users.map((users, index) => {
                  return (
                    <tr key={index}>
                      <td>{users.name}</td>
                      <td>{users.email}</td>
                      <td>{users.age}</td>
                      <td>
                        <button className="action-btn edit-btn">
                          <NavLink
                            to={`/update/${users._id}`}
                            style={{ textDecoration: "none", color: "white" }}
                            className="nl"
                          >
                            Edit
                          </NavLink>
                        </button>
                        <button className="action-btn delete-btn">
                          <NavLink
                            onClick={(e) => deleteUser(e, users._id)}
                            // to={`/delete/${users._id}`}
                            style={{ textDecoration: "none", color: "white" }}
                            className="nl"
                          >
                            Delete
                          </NavLink>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Users;
