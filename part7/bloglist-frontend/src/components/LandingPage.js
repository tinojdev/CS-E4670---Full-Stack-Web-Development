import React, {useState, useEffect, useRef} from "react";
import {Routes, Route} from "react-router-dom";

import * as blogService from "../services/blogs";
import * as usersService from "../services/users";
import Blogs from "./Blogs";
import Users from "./Users";
import NavigationMenu from "./NavigationMenu";
import User from "./User";
import Blog from "./Blog";

const LandingPage = ({user, setUser, addNotificationMessage}) => {
    const [blogs, setBlogs] = useState([]);
    const [isBlogsFetched, setIsBlogsFetched] = useState(false);
    const [users, setUsers] = useState([]);
    const blogFormRef = useRef();

    useEffect(() => {
        async function fetch(){
            const users = await usersService.getAll(); 
            setUsers(users);
        }
        fetch();
    }, []);

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

    // eslint-disable-next-line no-unused-vars
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
            <NavigationMenu handleLogout={handleLogout} user={user} />
            <Routes>
                <Route path="/" element={<Blogs blogs={blogs} addBlog={addBlog} addNotificationMessage={addNotificationMessage} blogFormRef={blogFormRef} />} />
                <Route path="/users" element={<Users users={users} />} />
                <Route path="/users/:id" element={<User users={users} />} />
                <Route path="/blogs/:id" element={<Blog blogs={blogs} addLikeToBlog={addLikeToBlog}/>} />
            </Routes>
             
        </div>
    );
};

export default LandingPage;