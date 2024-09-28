const express = require('express');
const mongoose = require('mongoose')
const app=express();
const port=4000;
const userModel = require('./Models/userModel')
const route = require('./UserRoutes/UserRoutes')
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.listen(port,()=>{
    console.log("App listening to the port 4000")
})
mongoose.connect(`mongodb+srv://Akash:akash60736073@database.k9n5zm9.mongodb.net/crudapp`)
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((error) => {
    console.error("MongoDB Connection Failed:", error);
});


app.use(route);