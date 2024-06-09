const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
// CREATE USER AND REGISTER OUR USER
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body
        //VALIDATION
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please Fill all the fields'
            })
        }

        //EXISTING USER VALIDATION
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: 'User Already Exists'
            })
        }

        //HASHING PASSWORD 
        const hashedPassword = await bcrypt.hash(password, 10)

        // SAVE NEW USER VALIDATION
        const user = new userModel({ username, email, password: hashedPassword })
        await user.save()
        return res.status(201).send({
            success: true,
            message: 'New User Created',
            user
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: 'Error In Register Callback',
            success: false,
            error
        })
    }
}

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: "All Users Data",
            users,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error In Getting the Users',
            error
        })
    }
}

// LOGIN
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        //EMAIL VALIDATION
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please provide email or password'
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).send({
                success: false,
                message: 'Email is not Registered '
            })
        }

        //PASSWORD VALIDATION
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid Password'
            })
        }
        return res.status(200).send({
            success:true,
            message: 'Login Successfully',
            user,
        })


    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
}