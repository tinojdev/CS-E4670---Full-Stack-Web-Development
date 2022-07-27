import React from "react";

import BlogContainerItem from "./BlogContainerItem";

const BlogContainer = ({blogs}) => {
    return(
        <div>
            <h2>Blogs</h2>
            {blogs.sort((a, b) => a.likes > b.likes ? -1 : 1).map(blog =>
                <BlogContainerItem key={blog.id} blog={blog} />
            )}
        </div>
    );
};

export default BlogContainer;