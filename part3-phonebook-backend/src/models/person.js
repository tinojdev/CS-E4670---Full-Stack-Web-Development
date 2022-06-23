const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;
console.log("Connecting to", MONGO_URL);

mongoose.connect(MONGO_URL)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.log("Error connecting to MongoDB:", error.message);
	});


const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		required: true,
	},
	number: {
		type: String,
		minlength: 8,
		required: true,
		validate: {
			validator: function (toTest) {
				return /^\d{2,3}-\d+$/.test(toTest);
			}
		}
	},
});
const Person = mongoose.model("Person", personSchema);

personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = Person;

