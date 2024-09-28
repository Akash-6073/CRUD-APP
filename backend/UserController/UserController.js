const userModel = require('../Models/userModel')
const registerUser = async(req,res)=>{
    const { email } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'OOPS!! Email is already taken.' }); // Email exists
        }

        // Create the user if the email is unique
        const newUser = await userModel.create(req.body);
        res.status(201).json(newUser); // Created successfully
    }
    catch (err) {
        res.status(500).json(err); // Handle other errors
    }
}

const getUser = (req,res)=>{
    userModel.find()
            .then((users)=>res.json(users))
            .catch((err)=>res.send(err))
}

const getUserById = (req,res)=>{
    const id=req.params.id;
    userModel.findById({_id:id})
            .then((users)=>res.json(users))
            .catch((err)=>res.json("hello"))
}

const updateUser = async(req,res)=>{
    const id=req.params.id;
    const {email}=req.body;
    try{
        const exisitingUser = await userModel.findOne({ email, _id: { $ne: id } })
        if(exisitingUser)
            return res.status(400).json({message:"OOPS!! Email is already taken."})
        userModel.findByIdAndUpdate({_id:id},{name:req.body.name,email:req.body.email,age:req.body.age})
                .then((users)=>res.json(users))
                .catch((err)=>res.json(err));
    }
    catch(err){
        res.json(err)
    }
}

const deleteUser = (req,res)=>{
    const id=req.params.id;
    userModel.findByIdAndDelete({_id:id})
            .then((users)=>res.json(users))
            .catch(err=>res.json(err))
}
module.exports={registerUser,getUser,getUserById,updateUser,deleteUser}