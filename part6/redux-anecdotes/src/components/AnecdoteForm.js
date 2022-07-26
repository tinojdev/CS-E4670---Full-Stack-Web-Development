import React from "react";
import { connect } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const content = event.target.content.value;
        event.target.content.value = "";
        props.createNewAnecdote(content);
    };

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div><input name="content" /></div>
                <button>create</button>
            </form>
        </div>
    );
};
export default connect(null, {createNewAnecdote})(AnecdoteForm);