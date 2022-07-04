const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../utils/config");
const Blog = require("../../models/blog");
const dummyBlogs = require("./dummyBlogs");
const helper = require("../helper");
const User = require("../../models/user");
const api = helper.api;


const dummyUser = {
    username: "root3",
    passwordHash: bcrypt.hashSync("password", 10),
    name: "Megauser",
};
let token;

describe("Blog api", () => {

    describe("GET", () => {

        test("blogs are returned as json", async () => {
            await api
                .get("/api/blogs")
                .expect(200)
                .expect("Content-Type", /application\/json/);
        });

        test("blogs return a correct amount of blogs", async () => {
            const response = await api.get("/api/blogs");
            expect(response.body).toHaveLength(6);
        });

        test("Each blog has a unique \"id\" identifier", async () => {
            const response = await api.get("/api/blogs");
            response.body.forEach(blog => expect(blog.id).toBeDefined());
        });

    });
    
    describe("POST", () => {

        test("A new blog post is correctly added to the database", async () => {
            const newBlogPostObj = {
                title: "test title 1",
                author: "test author 1",
                url: "test url 1",
                likes: 10,
            };
            await api.post("/api/blogs")
                .set({Authorization: "bearer " + token})
                .send(newBlogPostObj)
                .expect(201)
                .expect("Content-Type", /application\/json/);
            const response = await api.get("/api/blogs");
            const titles = response.body.map(blog => blog.title);
            expect(titles).toHaveLength(dummyBlogs.length + 1);
            expect(titles).toContain(newBlogPostObj.title);
        });

        test("a posted blog object with no likes defaults to zero", async () => {
            const newBlogPostObj = {
                title: "test title 1",
                author: "test author 1",
                url: "test url 1",
            };
            await api.post("/api/blogs")
                .set({Authorization: "bearer " + token})
                .send(newBlogPostObj)
                .expect(201)
                .expect("Content-Type", /application\/json/);
            const response = await api.get("/api/blogs");
            const postedObject = response.body.find(blog => blog.title === newBlogPostObj.title);
            expect(postedObject).toBeDefined();
            expect(postedObject.likes).toBe(0);
        });

        test("missing title and url in post return 400 status code", async () => {
            const newBlogPostObj = {
                author: "test author 1",
                likes: 10,
            };
            await api.post("/api/blogs")
                .set({Authorization: "bearer " + token})
                .send(newBlogPostObj).expect(400);
        
        });

        test("return 401 unauthorized if a token is not provided", async () => {
            const newBlogPostObj = {
                title: "test title 1",
                author: "test author 1",
                url: "test url 1",
            };
            await api.post("/api/blogs")
                .send(newBlogPostObj)
                .expect(401);
        });
    });
    describe("DELETE", () => {
        test("deleting a blog works correctly", async () => {
            const newBlogPostObj = {
                title: "test title 1",
                author: "test author 1",
                url: "test url 1",
                likes: 10,
            };
            let response = await api.post("/api/blogs")
                .set({Authorization: "bearer " + token})
                .send(newBlogPostObj)
                .expect(201);
            const idOfNewBlog = response.body.id;
            await api.delete(`/api/blogs/${idOfNewBlog}`)
                .set({Authorization: "bearer " + token})
                .expect(200);

            response = await api.get("/api/blogs");
            expect(response.body).toHaveLength(dummyBlogs.length);
            expect(response.body.find(blog => blog.id === idOfNewBlog)).not.toBeDefined();
        });

        test("attempting to delete a non-existing blog returns status code 404 NOT FOUND", async () => {
            await api.delete("/api/blogs/5a422a852b54a676234d17f7")
                .set({Authorization: "bearer " + token})
                .expect(404);
        });

        test("attempting to delete a malformatted id return status code 400 BAD REQUEST", async () => {
            await api.delete("/api/blogs/malformed-iddddddddddddddddddddddddddddddddddddddddddddddddddddd")
                .set({Authorization: "bearer " + token})
                .expect(400);
        });

        test("attempting to delete without a token returns 401 unauthorized", async () => {
            const newBlogPostObj = {
                title: "test title 1",
                author: "test author 1",
                url: "test url 1",
                likes: 10,
            };
            await api.post("/api/blogs")
                .send(newBlogPostObj)
                .expect(401);
     
        });
    });

    describe("UPDATE", () => {

        test("updating a blog works correctly", async () => {
            
            const idOfNewBlog = dummyBlogs[0]._id; 

            await api.put(`/api/blogs/${idOfNewBlog}`).send( {
                title: "updated test title 1",
                author: "updated test author 1",
                url: "updated test url 1",
                likes: 15,
            }).expect(200);
            const response = await api.get("/api/blogs");
            const updatedBlog = response.body.find(blog => blog.id === idOfNewBlog);
            expect(updatedBlog).toBeDefined();
            expect(updatedBlog.likes).toBe(15);
            expect(updatedBlog.title).toBe("updated test title 1");
            expect(updatedBlog.author).toBe("updated test author 1");
            expect(updatedBlog.url).toBe("updated test url 1");
        });

        test("attempting to update a non-existing blog returns status code 404 NOT FOUND", async () => {
            await api.put("/api/blogs/5a422a852b54a676234d17f7").expect(404);
        });

        test("attempting to update a malformatted id return status code 400 BAD REQUEST", async () => {
            await api.put("/api/blogs/malformed-iddddddddddddddddddddddddddddddddddddddddddddddddddddd").expect(400);
        });

    });

    beforeEach(async () => {
        await Blog.deleteMany({});
        await User.deleteMany({});
        await Blog.insertMany(dummyBlogs); 
        const user = new User(dummyUser);
        const savedUser = await user.save(); 
        token = jwt.sign({
            username: dummyUser.username,
            id: savedUser._id,
        }, config.SECRET);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});

