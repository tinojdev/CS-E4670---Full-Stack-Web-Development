const User = require("../../models/user");


const usersInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
};

const amountInDb = async () => {
    return (await usersInDb()).length;
};

module.exports = {
    usersInDb,
    amountInDb
};