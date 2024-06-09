const mongoose  = require('mongoose')
const blogModel = require('../models/blogModel')
const userModel = require('../models/userModel')

//GET all the blogs
exports.getAllBlogsControllers = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user')
        if(!blogs) {
            return res.status(200).send({
                success:false,
                message:'No blogs found',
            })
        }
        return res.status(200).send({
            success:true,
            BlogCount: blogs.length,
            message: "All blogs lists",
            blogs,
        })
    } catch (error) {
     console.log(error)   
     return res.status(500).send({
        success:false,
        message:'Error while getting blogs',
        error
     })
    }
}

//POST or Create the blog
exports.createAllBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body

        // VALIDATION 
        if(!title || !description || !image || !user) {
            return res.status(400).send({
                success:false,
                message: "Please Provide all the fields",
            })
        }
        const existingUser = await userModel.findById(user)
        // VALIDATION FOR FINDING THE USER
        if(!existingUser){
          return res.status(404).send({
            success:false,
            message:'Unable to find user'
          })
        }

        //SAVING THE BLOG
        const newBlog = new blogModel({ title, description, image, user })
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({ session })
        existingUser.blogs.push(newBlog)
        await existingUser.save({ session })
        await session.commitTransaction()
        await newBlog.save()
        return res.status(201).send({
            success: true,
            message: "Blog Created",
            newBlog,
        })
    } catch (error) {
     console.log(error)  
      return res.status(400).send({
        success:false,
        message:'Error while creating a blog',
        error,
      })
    }
}

//PUT or Update the blog
exports.updateAllBlogController = async (req, res) => {
    try {
      const { id } = req.params
      const { title, description, image } = req.body
      const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true })  
      return res.status(200).send({
        success: true,
        message: "Blog Updated",
        blog
      })
    } catch (error) {
     console.log(error)  
     return res.status(400).send({
        success:false,
        message: "Error while updating the Blog",
        error
      });
    }
}

//GET details of the a single blog
exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
          return res.status(404).send({
            success: false,
            message: "blog not found with this is",
          });
        }
        return res.status(200).send({
          success: true,
          message: "Fetched the single blog",
          blog,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "Error while getting single blog",
          error,
        });
      }
    };

//DELETE the blog
exports.deleteAllBlogController = async (req, res) => {
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save()

        return res.status(200).send({
          success: true,
          message: "Blog Deleted!",
        });
      } catch (error) {
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "Error while deleting the Blog",
          error,
        });
      }
    };

// GET USER BLOG
exports.userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs")
    if(!userBlog){
      return res.status(404).send({
        success: true,
        message: "Blogs can not be found with this ID",
      })
    }
    return res.status(200).send({
      success: true,
      message: "User Blogs",
      userBlog,
    })
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      success: false,
      message: "Error in the user Blog",
      error,
    });
  }
}