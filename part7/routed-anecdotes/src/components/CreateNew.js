import React from "react";
import { useNavigate } from "react-router-dom";
import useField from "../hooks/useField";

const CreateNew = (props) => {
    const content = useField("text");
    const author = useField("text"); 
    const info = useField("text");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addNew({
            content: content.fields.value,
            author: author.fields.value,
            info: info.fields.value,
            votes: 0
        });
        navigate("/");
        props.addNotification(`A new anecdote ${content.value} created!`);
    };

    const reset = () => {
        content.reset();
        author.reset();
        info.reset();
    };

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
          content
                    <input {...content.fields} /> 
                </div>
                <div>
          author
                    <input {...author.fields} />
                </div>
                <div>
          url for more info
                    <input {...info.fields} />
                </div>
                <button>create</button><button type="button" onClick={reset}>reset</button>
            </form>
        </div>
    );

};

export default CreateNew;