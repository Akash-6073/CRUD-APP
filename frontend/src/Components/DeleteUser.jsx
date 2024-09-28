import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';

const DeleteUser = () => {
  const {register,handleSubmit,formState:{errors},setValue} = useForm();
  const {id} = useParams();
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get('http://localhost:4000/getUserById/'+id)
          .then((users)=>{
              setValue('name',users.data.name)
              setValue('email',users.data.email)
              setValue('age',users.data.age)
          })
          .catch((err)=>console.log(err))
  })
  const submit = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      axios.delete('http://localhost:4000/deleteUser/' + id)
        .then(() => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <div className='container'>
    <form onSubmit={handleSubmit(submit)} method='post'>
        <h1>Delete User</h1>
        
        <label htmlFor="name">Name</label>
        <input 
            disabled
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
            disabled
            type="email" 
            {...register("email", { required: true })} 
            className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <p className='error-message'>{errors.email.message}</p>}

        <label htmlFor="age">Age</label>
        <input 
            disabled
            type="number" 
            {...register("age", { required: true })} 
            className={errors.age ? 'input-error' : ''}
        />
        {errors.age && <p className='error-message'>Age is required</p>}

        <input type="button" onClick={submit} style={{backgroundColor:"red"}} value="Delete User" />
    </form>
</div>
  )
}

export default DeleteUser
