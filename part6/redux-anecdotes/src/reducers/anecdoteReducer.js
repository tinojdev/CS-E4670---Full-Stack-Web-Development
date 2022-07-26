import anecdotesService from "../services/anecdotes";

const anecdotesAtStart = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
    const copyOfState = [...state];

    switch (action.type) {
    case "NEW_ANECDOTE": {
        const anecdote = action.data;
        copyOfState.push(anecdote);
        return copyOfState;
    }
    case "ADD_VOTE": {
        const indexOf = copyOfState.findIndex(anecdote => anecdote.id === action.data.id);
        const copyOfObj = {...copyOfState[indexOf]};
        copyOfObj.votes++;
        copyOfState[indexOf] = copyOfObj;

        return copyOfState;
    }
    case "SET_ANECDOTES": {
        return action.data;
    }
    default:
        return copyOfState;
    }
};

export const addVote = (id) => {
    return {
        type: "ADD_VOTE",
        data: {id}
    };
};

export const createAnecdote = (anecdote) => {
    return {
        type: "NEW_ANECDOTE",
        data: anecdote,
    };
};

export const setAnecdotes = (anecdotes) => {
    return {
        type: "SET_ANECDOTES",
        data: anecdotes,
    };
};

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdotesService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
};

export const createNewAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdotesService.createNew(content);
        dispatch(createAnecdote(newAnecdote)); 
    };
};

export const addVoteToAnecdote = (id) => {
    return async dispatch => {
        const anecdote = await anecdotesService.addVote(id);
        dispatch(addVote(anecdote.id));
    };
};
export default reducer;