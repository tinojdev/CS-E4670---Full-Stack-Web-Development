require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
app.use(cors());
app.use(express.json());


const format = morgan(function (tokens, req, res) {
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, "content-length"), "-",
		tokens["response-time"](req, res), "ms",
		JSON.stringify(req.body),
	].join(" ");
});

app.use(format);
app.use(express.static("build"));

app.get("/info", async (request, response) => {
	const personCount = await Person.count();
	response.send(`<p>Phonebook has info for ${personCount} people</p><p>${new Date()}`);
});

app.get("/api/persons", async (request, response) => {
	const persons = await Person.find({});
	response.json(persons);
});

app.get("/api/persons/:id", async (request, response, next) => {
	try {
		const person = await Person.findById(request.params.id);
		if (person === null) {
			response.status(404).end();
		} else {
			response.json(person);
		}
	} catch (err) {
		next(err);
	}
});

app.delete("/api/persons/:id", async (request, response, next) => {
	try {
		const deletedPerson = await Person.findByIdAndRemove(request.params.id);

		if (deletedPerson) response.json(deletedPerson);
		else response.status(404).end();

	} catch (err) {
		next(err);
	}
});

app.post("/api/persons", async (request, response, next) => {
	const body = request.body;
	const persons = await Person.find({});

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: "name or number missing"
		});
	}
	if (persons.some(person => person.name === body.name)) {
		return response.status(400).json({
			error: "name must be unique"
		});
	}
	let newPerson = new Person({
		name: body.name,
		number: body.number,
	});
	try {
		newPerson = await newPerson.save();
		response.json(newPerson);
	} catch (err) {
		next(err);
	}
});

app.put("/api/persons/:id", async (request, response, next) => {
	const body = request.body;
	const updatedNumber = {
		number: body.number,
	};
	try {
		const updatedPerson = await Person.findByIdAndUpdate(request.params.id, updatedNumber, { new: true, runValidators: true });
		response.json(updatedPerson);
	} catch (err) {
		next(err);
	}
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	}
	if (error.name === "ValidationError") {
		return response.status(400).send({ error: error.message });
	}

	next(error);
};

app.use(errorHandler);