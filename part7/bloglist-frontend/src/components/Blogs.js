import React from "react";

import Togglable from "./Toggleable";
import BlogForm from "./BlogForm";
import BlogContainer from "./BlogContainer";

const Blogs = (props) => {
    return (
        <div>
            <Togglable buttonLabel="New Blog" ref={props.blogFormRef}>
                <BlogForm addNotificationMessage={props.addNotificationMessage} addBlog={props.addBlog} />
            </Togglable>
            <BlogContainer blogs={props.blogs} addLikeToBlog={props.addLikeToBlog} removeBlog={props.removeBlog} />
        </div>
    );
};

export default Blogs;