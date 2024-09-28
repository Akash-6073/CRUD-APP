const express = require('express');
const router = express.Router();

const {registerUser,getUser,getUserById,updateUser, deleteUser} = require('../UserController/UserController')

router.route('/createUser')
      .post(registerUser)

router.route('/')
      .get(getUser)

router.route('/getUserById/:id')
      .get(getUserById)

router.route('/updateUser/:id')
      .put(updateUser)

router.route('/deleteUser/:id')
      .delete(deleteUser)
module.exports = router