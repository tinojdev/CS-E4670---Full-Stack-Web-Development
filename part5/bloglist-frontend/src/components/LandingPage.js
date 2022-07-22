import React, {useState, useEffect, useRef} from "react";
import * as blogService from "../services/blogs";
import BlogContainer from "./BlogContainer";
import BlogForm from "./BlogForm";
import Togglable from "./Toggleable";

const LandingPage = ({user, setUser, addNotificationMessage}) => {
    const [blogs, setBlogs] = useState([]);
    const [isBlogsFetched, setIsBlogsFetched] = useState(false);
    const blogFormRef = useRef();


    useEffect(() => {
        if (isBlogsFetched === true) return;
        const fetchBlogs = async () => {

            const blogs = await blogService.getAll();
            setBlogs(blogs);
            setIsBlogsFetched(true);
        };
        fetchBlogs();
    }, [isBlogsFetched]);

    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility();
        try {
            await blogService.create(blogObject);
            setIsBlogsFetched(false);
            addNotificationMessage(`New blog "${blogObject.title}" by ${blogObject.author} has been added!`, true);
        }
        catch (err) {
            console.log(err);
            addNotificationMessage("A new blog could not be created", false);
        }
    };

    const addLikeToBlog = async (blogObject) => {
        try {
            await blogService.addLike(blogObject);
            setIsBlogsFetched(false);
        } catch (err) {
            console.log(err);
            addNotificationMessage(`Failed to like blog ${blogObject.title}`);
        }
    };

    const removeBlog = async (blogId) => {
        try {
            await blogService.remove(blogId);
            addNotificationMessage("Succesfully removed the blog!", true);
        } catch (err) {
            console.log(err);
            addNotificationMessage("Failed to remove blog!", "red");
        }
        setIsBlogsFetched(false);
    };

    const handleLogout = () => {
        addNotificationMessage("You have been logged out", true);
        window.localStorage.removeItem("loggedBlogAppUser");
        setUser(null);
    };
    
    
    return (
        <div>
            <h4>Logged in as {user.username} <button onClick={() => handleLogout()}>Logout</button></h4>
            <Togglable buttonLabel="New Blog" ref={blogFormRef}>
                <BlogForm addNotificationMessage={addNotificationMessage} addBlog={addBlog} />
            </Togglable>
            <BlogContainer blogs={blogs} addLikeToBlog={addLikeToBlog} removeBlog={removeBlog} /> 
        </div>
    );
};

export default LandingPage;