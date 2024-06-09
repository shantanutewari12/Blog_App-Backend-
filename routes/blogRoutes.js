const express = require('express')
const { getAllBlogsControllers, createAllBlogController, updateAllBlogController, deleteAllBlogController, getBlogByIdController, userBlogController } = require('../controllers/blogControllers')

//ROUTER OBJECT
const router = express.Router()

//ROUTES :- 

//GET all the blogs
router.get('/all-blog', getAllBlogsControllers)

//POST or create the blog
router.post('/create-blog', createAllBlogController)

//PUT or Update the blog
router.put('/update-blog/:id', updateAllBlogController)

//DELETE the blog
router.delete('/delete-blog/:id', deleteAllBlogController)

//GET details of the a single blog
router.get('/get-blog/:id', getBlogByIdController)

//GET User blog
router.get('/user-blog/:id', userBlogController)

module.exports = router