import React, { useState } from 'react'
import { ToastContainer, toast,Bounce } from 'react-toastify';
import { useForm} from "react-hook-form"
import '../Styles/CreateUsers.css'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
const CreateUsers = () => {
  const navigate = useNavigate();
    const{register,handleSubmit,formState:{errors},setError} = useForm()
    const submit = (data) => {
      axios.post("http://localhost:4000/createUser", data)
          .then((res) => {
            toast.success('User added successfully!', {
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
              setTimeout(()=>{
                navigate('/')
              },1200)
            console.log("Added Successfully")
          })
          .catch((err) => {
            if (err.response && err.response.status === 400) { // Assuming 400 for duplicate error
                setError('email', {
                    type: 'manual',
                    message: err.response.data.message || 'Email is already taken'
                });
            } else {
                console.log(err);
            }
        });
  }
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
    <div className='container'>
    <form onSubmit={handleSubmit(submit)} method='post'>
      
        <h1>Add User</h1>
        
        <label htmlFor="name">Name</label>
        <input 
            type="text" 
            {...register("name", 
              { 
                required: {
                  value:true,
                  message:"Name is required"
                },
                minLength:{
                  value:3,
                  message:"Atleast 3 characters",
                }
               })} 
            className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <p className='error-message'>{errors.name.message}</p>}

        <label htmlFor="email">Email</label>
        <input 
            type="email" 
            {...register("email", { required: true })} 
            className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <p className='error-message'>{errors.email.message}</p>}

        <label htmlFor="age">Age</label>
        <input 
            type="number" 
            {...register("age", { required: true })} 
            className={errors.age ? 'input-error' : ''}
        />
        {errors.age && <p className='error-message'>Age is required</p>}

        <input type="submit" value="Submit" />
    </form>
</div>
</>

  )
}

export default CreateUsers
