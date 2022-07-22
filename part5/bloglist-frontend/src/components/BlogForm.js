import React, {useState} from "react";
import PropTypes from "prop-types";

const BlogForm = ({addBlog }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newBlog =  {
            title: title,
            author: author,
            url: url,
        };
        addBlog(newBlog);
        setTitle("");
        setAuthor("");
        setUrl("");
        
    };

    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleAuthorChange = (event) => setAuthor(event.target.value);
    const handleUrlChange = (event) => setUrl(event.target.value);

    return(
        <div>
            <h3>Create new blog</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title: </label> 
                    <input name="title" placeholder="Title" value={title} onChange={handleTitleChange}/>
                </div>
                <div>
                    <label htmlFor="author">Author: </label>
                    <input name="author" placeholder="Author" value={author} onChange={handleAuthorChange}/>
                </div>
                <div>
                    <label htmlFor="url">Url: </label>
                    <input name="url" placeholder="Url" value={url} onChange={handleUrlChange}/>
                </div>
                <button type="submit">Save</button>
            </form> 
        </div>
    );

};
BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired,
};
export default BlogForm;