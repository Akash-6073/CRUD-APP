import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { NavLink } from "react-router-dom";
import "../Styles/Users.css";
import axios from "axios";
import Loader from "../Loaders/Loader";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flag,setFlag] = useState(0);
  const [notify,setNotify] = useState(0);
  const [delname,setDelName] = useState("");
  useEffect(() => {
    
    axios
      .get("https://crud-app-1-aklu.onrender.com/")
      .then((user) => {
        setUsers(user.data);
        if(!flag)
        {
          setLoading(false);
        }
        if(notify){
          toast.success(`User "${delname}" Deleted successfully`, {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
         setNotify(0);
        }
      })
      .catch((err) => console.log(err));
  },[flag,notify]);
  // !! One way Of Deleting user
  const deleteUser = (e, id) => {
    e.target.value="Deleting"
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      setFlag(1);
      setLoading(true)
      axios
        .delete("https://crud-app-1-aklu.onrender.com/deleteUser/" + id)
        .then((users) => {
          setDelName(users.data.name);
         setFlag(0);
         setNotify(1);
        })
        .catch((err) => {
         setFlag(0);
        });
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
      {loading ? (
        <Loader />
      ) : (
        <>
         
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
                  {
                    users.length==0 ? <tr>
                    <td colSpan="4" className="no-users">
                      No users found
                    </td>
                  </tr>:
                    users.map((users, index) => {
                      return (
                        <tbody>
                        <tr key={users._id}>
                          <td>{users.name}</td>
                          <td>{users.email}</td>
                          <td>{users.age}</td>
                          <td>
                            <button className="action-btn edit-btn">
                              <NavLink
                                to={`/update/${users._id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "white",
                                }}
                                className="nl"
                              >
                                Edit
                              </NavLink>
                            </button>
                            <button className="action-btn delete-btn">
                              <NavLink
                                onClick={(e) => deleteUser(e, users._id)}
                                // to={`/delete/${users._id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "white",
                                }}
                                className="nl"
                                value="delete"
                              >
                                Delete
                              </NavLink>
                            </button>
                          </td>
                        </tr>
                  </tbody>
                      );
                    })
                  }
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Users;
