const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const PASSWORD = process.argv[2]
const url =
    `mongodb+srv://tinoj:${PASSWORD}@cli-database.bvjh6lw.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)



if (process.argv.length === 3) {
    // We only received a password
    console.log("phonebook:");
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        })
        mongoose.connection.close();
    })
} else {
    if (process.argv.length < 5) {
        console.log("You need to provide an username and a password!");
        process.exit(1);
    }
    const PERSON_NAME = process.argv[3];
    const PERSON_NUMBER = process.argv[4];

    const person = new Person({
        name: PERSON_NAME,
        number: PERSON_NUMBER,
    });

    person.save().then(result => {
        console.log(`Added "${PERSON_NAME}", number: "${PERSON_NUMBER}" to phonebook;`)
        mongoose.connection.close()
    })


}


