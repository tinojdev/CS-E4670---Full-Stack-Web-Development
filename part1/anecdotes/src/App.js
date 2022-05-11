import { useState } from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const addVote = () => {
    const copy = [...votes];
    copy[selected]++;
    setVotes(copy);
  }

  const selectRandom = () => {
    const randIndex = getRandomInt(anecdotes.length);
    setSelected(randIndex);
  }

  const getMaxVotesIndex = () => votes.indexOf(Math.max(...votes));


  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
        <Button text="vote" onClick={addVote}/>
        <Button text="next anecdote" onClick={selectRandom}/>
      </div>
      <div>
        <h2>Anecdote with the most votes</h2>
        <Anecdote text={anecdotes[getMaxVotesIndex()]} votes={votes[getMaxVotesIndex()]} />
      </div>
    </div>
  )
}

const Button = (props) => {
  const { text, onClick} = props;

  return (
    <button onClick={(e) => onClick()}>{text}</button>
  )
}

const Anecdote = (props) => {
  const { text, votes } = props;


  return (
    <div>
      {text}
      <br></br>
      has {votes} votes
    </div>
  )
}


export default App