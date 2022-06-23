import React, { useState, useEffect } from "react";
import personSevice from "./services/persons";
import { Notification } from "./components/notification";
import "./css/main.css";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [filteredPersons, setFilteredPersons] = useState([]);
	const [filterValue, setFilterValue] = useState("");

	const [newName, setNewName] = useState("");
	const [newAddress, setNewAddress] = useState("");
	const [errorMessage, setErrorMessage] = useState(undefined);
	const [successMessage, setSuccessMesage] = useState(undefined);

	// manually fetch data
	async function fetchData() {
		const persons = await personSevice.getAll();
		setPersons(persons);
	}
	// On start fetchg data once;
	useEffect(() => {
		const fetchData = async () => {
			const persons = await personSevice.getAll();
			setPersons(persons);
		};
		fetchData();
	}, []);

	// Update filtered persons whenever persons or filtervalue are changed;
	useEffect(() => {
		const filtered = persons.filter(person => person.name.toLowerCase().includes(filterValue));
		setFilteredPersons(filtered);
	}, [persons, filterValue]);

	const handleFilterChange = (newFilterValue) => {
		setFilterValue(newFilterValue);
	};

	const handleNameChange = (newName) => {
		setNewName(newName);
	};

	const handleNumberChange = (newAddress) => {
		setNewAddress(newAddress);
	};

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
			return;
		}
		addSuccessMessage(`Deleted ${name}!`);
		fetchData();
	};

	const addErrorMessage = async (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(undefined);
		}, 5000);

	};
	const addSuccessMessage = async (message) => {
		setSuccessMesage(message);
		setTimeout(() => {
			setSuccessMesage(undefined);
		}, 5000);
	};

	const updateUser = async () => {
		const toUpdate = persons.find(person => person.name === newName);
		try {

			await personSevice.update(toUpdate.id, { name: newName, number: newAddress });
			addSuccessMessage(`Updated ${toUpdate.name}!`);
		} catch (err) {
			console.log(err);
			addErrorMessage(`${err.response.data.error}`)
		}
		fetchData();
	};
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
		};
		let responseData;
		try {
			responseData = await personSevice.create(newPerson);
		} catch (err) {
			console.log(err);
			addErrorMessage(`${err.response.data.error}`)
			return;
		}

		const newPersons = (persons.concat(responseData));
		setNewName("");
		setNewAddress("");
		addSuccessMessage(`Added ${newName}!`);
		// Make sure that the filtered output also updates
		setPersons(newPersons);
	};
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
	);
};
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
	);
};

const Person = ({ name, number, id, handleDelete }) => {

	return (
		<div>
			<p><b>Name:</b> {name}, <b>number:</b> {number} <button onClick={(e) => handleDelete(name, id)}>Delete</button></p>
		</div>
	);
};

const Persons = ({ persons, handleDelete }) => {
	return (
		<div>
			{persons.map(person => <Person name={person.name} number={person.number} key={person.name} id={person.id} handleDelete={handleDelete} />)}
		</div>
	);
};
const Filter = ({ filterValue, handleFilterChange }) => {
	return (
		<div>
			Filter shown with: <input onChange={(e) => handleFilterChange(e.target.value)} value={filterValue} />
		</div>
	);
};

export default App;