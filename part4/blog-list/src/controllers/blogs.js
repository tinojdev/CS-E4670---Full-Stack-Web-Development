const blogsRouter = require("express").Router();

const Blog = require("../models/blog");



blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {username: 1, name: 1, id: 1});
    response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
    const body = request.body;

    const user = request.user;
    if (!user) return response.status(401).json({error: "token missing or invalid"});


    const newBlog = new Blog({
        title: body.title,
        url: body.url,
        author: body.author,
        likes: body.likes,
        user: user._id
    });

    try {
        const savedBlog = await newBlog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save(); 
        response.status(201).json(savedBlog);
    } catch (err) {
        console.error(err);
        response.status(400).end();
    }
});

blogsRouter.delete("/:id", async (request, response) => {
    const user = request.user;
    if (!user) return response.status(401).json({error: "token missing or invalid"});

    try {

        const blogToDelete = await Blog.findById(request.params.id);
        if (!blogToDelete) return response.status(404).end();
        if (blogToDelete.user.toString() !== user.id.toString()) response.status(401).end();
    } catch(err) {
        return response.status(400).end();
    }

    try {
        const deletedBlog = await Blog.findByIdAndRemove(request.params.id);
        if (deletedBlog) response.json(deletedBlog);
        else response.status(404).end();
    } catch (err) {
        console.error(err);
        response.status(400).end();

    }
});

blogsRouter.put("/:id", async (request, response) => {
    try {
        const body = request.body;
        const currentBlog = await Blog.findById(request.params.id);
        if (!currentBlog) response.status(404).end();
        
        let updatedBlog = {
            title: body.title || currentBlog.title,
            author: body.author || currentBlog.author,
            url: body.url || currentBlog.url,
            likes: body.likes || currentBlog.likes,
        }; 
        updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {new: true, runValidators: true});
        response.json(updatedBlog);

    } catch (err) {
        console.error(err);
        response.status(400).end();
    }
});

module.exports = blogsRouter;