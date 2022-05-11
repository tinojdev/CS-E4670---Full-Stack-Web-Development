import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const incrementGood = () => setGood(good + 1);
  const [neutral, setNeutral] = useState(0)
  const incrementNeutral = () => setNeutral(neutral + 1);
  const [bad, setBad] = useState(0)
  const incrementBad = () => setBad(bad + 1);

  return (
    <div>
      <div>
        <h2>Give feedback</h2>
        <Button text="good" incrementFunc={incrementGood} />
        <Button text="neutral" incrementFunc={incrementNeutral} />
        <Button text="bad" incrementFunc={incrementBad} />
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

const Button = (props) => {
  const { text, incrementFunc } = props;

  return (
    <button onClick={(e) => incrementFunc()}>{text}</button>
  )
}
const Statistics = (props) => {
  const { good, neutral, bad } = props;

  const getAll = () => good + neutral + bad;

  const getAverage = () => (good - bad) / getAll();

  const getPercentGood = () => good / getAll() * 100;

  return (
    <div>
      <h2>Statistics</h2>
      {getAll() === 0 ?
        <p>No Feedback given </p> :
        <table>
          <tbody>
            <StatisticLine text="good" stat={good} />
            <StatisticLine text="neutral" stat={neutral} />
            <StatisticLine text="bad" stat={bad} />
            <StatisticLine text="all" stat={getAll()} />
            <StatisticLine text="average" stat={getAverage()} />
            <StatisticLine text="positive" stat={getPercentGood() + "%"} />
          </tbody>
        </table>
      }
    </div>
  )
}
const StatisticLine = (props) => {
  const { text, stat } = props;
  return (
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr>
  )
}

export default App