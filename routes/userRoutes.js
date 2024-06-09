const express = require('express')
const { getAllUsers, registerController, loginController } = require('../controllers/userController')

//ROUTER OBJECT
const router = express.Router()

// GET THE DATA OF OUR USER || POST METHOD
router.get('/all-users',getAllUsers)

// CREATE OUR USER || GET METHOD
router.post('/register', registerController)

// LOGIN USER || GET METHOD
router.post('/login', loginController)


module.exports =router