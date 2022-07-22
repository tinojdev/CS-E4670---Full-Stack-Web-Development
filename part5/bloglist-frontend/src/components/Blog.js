import React, { useState } from "react";


const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
};

const Blog = ({blog, addLikeToBlog, removeBlog}) => {
    const [isExtended, setIsExtended] = useState(false);

    const handleShowButtonClick = () => isExtended ? setIsExtended(false) : setIsExtended(true);
    const handleLikeButtonClick = async () => await addLikeToBlog(blog);
    const handleRemoveButtonClick = async () => {
        if (confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            removeBlog(blog.id);
        }
    };


    return (
        <div style={blogStyle} className="blog">
            <p>
                {blog.title}, {blog.author}
                <button onClick={() => handleShowButtonClick()}>{isExtended ? "Hide" : "Show"}</button>
            </p>
            {isExtended ? 
                <>
                    <p>Url: {blog.url}</p>
                    <p>Likes: {blog.likes} <button onClick={handleLikeButtonClick}>Like</button></p>
                    <p>Added by: {blog.user.name}</p>
                    <button onClick={handleRemoveButtonClick}>Remove</button>
                </> 
                : <></>}
        </div>  
    );
};

export default Blog;