import React from "react";
import {Link} from "react-router-dom";

const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
            {anecdotes.map(anecdote => <AnecdoteListItem key={anecdote.id} anecdote={anecdote} />)}
        </ul>
    </div>
);

const AnecdoteListItem = ({anecdote}) => {
    return(
        <Link to={`/anecdotes/${anecdote.id}`}>
            <li key={anecdote.id} >{anecdote.content}</li>
        </Link>
    );
};

export default AnecdoteList;