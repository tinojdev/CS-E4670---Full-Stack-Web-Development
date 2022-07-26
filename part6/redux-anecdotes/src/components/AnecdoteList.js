import React from "react";
import {useSelector, useDispatch} from "react-redux";
import { addVoteToAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationSlice";

const AnecdoteList = () => {
    const dispatch = useDispatch();

    const filterText = useSelector(state => state.filter.filterText);
    const anecdotes = useSelector(state => state.anecdotes
        .sort((a, b) => a.votes > b.votes ? -1 : 1)
        .filter((anecdote) => anecdote.content.includes(filterText))
    );

    const vote = (id) => {
        dispatch(addVoteToAnecdote(id));
        dispatch(setNotification(`You voted for ${anecdotes.find(anecdote => anecdote.id === id).content}`, 2));
        
    };
    
    return(
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                    has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
 
        </div>
    );
};
export default AnecdoteList;