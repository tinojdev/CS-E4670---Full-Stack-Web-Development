import React from "react";
import {useParams} from "react-router-dom";

const Blog = ({blogs, addLikeToBlog}) => {
    const id = useParams().id;
    const blog = blogs.find(blog => blog.id === id);

    return (
        <div>
            <h2>{blog.title}</h2>
            <p>{blog.url}</p>
            <p>{blog.likes} likes <button onClick={() => addLikeToBlog(blog)}>like</button></p>
            <p>added by {blog.user.name}</p>
        </div>
    );
};

export default Blog;