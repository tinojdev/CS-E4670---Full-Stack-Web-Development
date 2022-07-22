import React from "react";

import Blog from "./Blog";

const BlogContainer = ({blogs, addLikeToBlog, removeBlog}) => {
    return(
        <div>
            <h2>Blogs</h2>
            {blogs.sort((a, b) => a.likes > b.likes ? -1 : 1).map(blog =>
                <Blog key={blog.id} blog={blog} addLikeToBlog={addLikeToBlog} removeBlog={removeBlog} />
            )}
        </div>
    );
};

export default BlogContainer;