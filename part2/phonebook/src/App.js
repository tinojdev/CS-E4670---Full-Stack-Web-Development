import { useState, useEffect } from 'react'
import personSevice from "./services/persons";
import { Notification } from './components/notification';
import './css/main.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMesage] = useState(undefined);

  async function fetchData() {
    const persons = await personSevice.getAll();
    setPersons(persons);
    handleFilterChange(filterValue, persons);
  }
  useEffect(() => {

    fetchData();
  }, []);

  // Alternatepersons is a optional array that will be used if persons hook hasnt been updated yet;
  const handleFilterChange = (newFilterValue, alternatePersons = undefined) => {
    setFilterValue(newFilterValue);
    const toFilter = alternatePersons || persons;
    const filtered = toFilter.filter(person => person.name.toLowerCase().includes(newFilterValue));
    setFilteredPersons(filtered);
  }

  const handleNameChange = (newName) => {
    setNewName(newName);
  }

  const handleNumberChange = (newAddress) => {
    setNewAddress(newAddress);
  }

  const handleDelete = async (name, id) => {

    const answer = window.confirm(`Delete ${name}?`);
    if (answer === false) {
      return;
    }
    try {
      await personSevice.remove(id);
    } catch (err) {
      addErrorMessage(`${name} was already deleted!`);
      fetchData();
    }
    addSuccessMessage(`Deleted ${name}!`)
    fetchData();
  }
  const addErrorMessage = async (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(undefined);
    }, 5000);

  }
  const addSuccessMessage = async (message) => {
    setSuccessMesage(message);
    setTimeout(() => {
      setSuccessMesage(undefined);
    }, 5000);
  }

  const updateUser = async () => {
    const toUpdate = persons.find(person => person.name === newName);
    await personSevice.update(toUpdate.id, { name: newName, number: newAddress });
    addSuccessMessage(`Updated ${toUpdate.name}!`);
    fetchData();
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      const answer = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (answer === true) updateUser();
      return;
    }
    const newPerson = {
      name: newName,
      number: newAddress,
    }
    const responseData = await personSevice.create(newPerson);

    const newPersons = (persons.concat(responseData));
    setNewName("");
    setNewAddress("");
    addSuccessMessage(`Added ${newName}!`);
    // Make sure that the filtered output also updates
    handleFilterChange(filterValue, newPersons);
    setPersons(newPersons);
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} isError={true} />
      <Notification message={successMessage} isError={false} />
      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange} />
      <h2>Add a new person</h2>
      <PersonForm newName={newName} newAddress={newAddress} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} />
      <h2>Numbers:</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}
const PersonForm = ({ newName, newAddress, handleNameChange, handleNumberChange, handleSubmit }) => {

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input value={newName} onChange={(e) => handleNameChange(e.target.value)} />
        </div>
        <div>
          Number: <input value={newAddress} onChange={(e) => handleNumberChange(e.target.value)} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}

const Person = ({ name, number, id, handleDelete }) => {

  return (
    <div>
      <p><b>Name:</b> {name}, <b>number:</b> {number} <button onClick={(e) => handleDelete(name, id)}>Delete</button></p>
    </div>
  )
}

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map(person => <Person name={person.name} number={person.number} key={person.name} id={person.id} handleDelete={handleDelete} />)}
    </div>
  )
}
const Filter = ({ filterValue, handleFilterChange }) => {
  return (
    <div>
      Filter shown with: <input onChange={(e) => handleFilterChange(e.target.value)} value={filterValue} />
    </div>
  )
}

export default App