import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loaders/Loader";
const UpdateUsers = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://crud-app-1-aklu.onrender.com/getUserById/" + id)
      .then((user) => {
        setValue("name", user.data.name);
        setValue("email", user.data.email);
        setValue("age", user.data.age);
        console.log("loading here");
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const submit = (data) => {
    console.log("Hi");
    axios
      .put("https://crud-app-1-aklu.onrender.com/updateUser/" + id, data)
      .then((users) => {
        toast.success("Updated successfully!", {
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
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          // Assuming 400 for duplicate error
          setError("email", {
            type: "manual",
            message: err.response.data.message || "Email is already taken",
          });
        } else {
          console.log(err);
        }
      });
  };
  return (
    <>
      {!loading ? (
        <Loader />
      ) : (
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
            <form onSubmit={handleSubmit(submit)}>
              <h1>Update User</h1>

              <label htmlFor="name">Name</label>
              <input
                type="text"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                  minLength: {
                    value: 3,
                    message: "At least 3 characters",
                  },
                })}
                name="name" // Name attribute for the input
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && (
                <p className="error-message">{errors.name.message}</p>
              )}

              <label htmlFor="email">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: true,
                })}
                name="email"
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}

              <label htmlFor="age">Age</label>
              <input
                type="number"
                {...register("age", {
                  required: true,
                })}
                name="age"
                className={errors.age ? "input-error" : ""}
              />
              {errors.age && <p className="error-message">Age is required</p>}

              <input type="submit" value="Submit" />
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateUsers;
