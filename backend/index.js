require('dotenv').config(); // Add this line at the top of your file

const express = require('express');
const mongoose = require('mongoose')
const app=express();
const port=process.env.PORT;
const userModel = require('./Models/userModel')
const route = require('./UserRoutes/UserRoutes')
const cors = require('cors')
const mongoConnection = process.env.DB_URI
app.use(cors())
app.use(express.json());
app.listen(port,()=>{
    console.log("App listening to the port 4000")
})
mongoose.connect(mongoConnection)
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((error) => {
    console.error("MongoDB Connection Failed:", error);
});


app.use(route);