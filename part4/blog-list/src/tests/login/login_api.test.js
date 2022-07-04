const helper = require("../helper");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

const api = helper.api;

const dummyUser = {
    username: "root",
    name: "Hyperuser",
    password: "password",
};
const dummyUserWithHash = {
    username: dummyUser.username,
    name: dummyUser.name,
    passwordHash: bcrypt.hashSync(dummyUser.password, 10),
};

describe("POST", () => {
    test("posting a correct username and password returns a token", async () => {
        const response = await api.post("/api/login").send({
            "username": dummyUser.username,
            "password": dummyUser.password, 
        }).expect(200);
        expect(response.body.token).toBeDefined();
    });
    test("posting an incorrect username returns 401", async () => {
        await api.post("/api/login").send({
            "username": "wrong username",
            "password": dummyUser.password,
        }).expect(401);
    });
    test("posting an incorrect password returns 401", async () => {
        await api.post("/api/login").send({
            "username": dummyUser.username,
            "password": "wrong password",
        }).expect(401);
    }); 
    beforeEach(async () => {
        await User.deleteMany({});
        const user = new User(dummyUserWithHash);
        await user.save();
    });
});