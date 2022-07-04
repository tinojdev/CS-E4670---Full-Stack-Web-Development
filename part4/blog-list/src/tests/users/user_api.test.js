const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const userHelper = require("./user_helper");
const helper = require("../helper");
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

describe("User api", () => {


    describe("Getting users", () => {
        test("Getting all users returns correct amount", async () => {
            const response = await api.get("/api/users")
                .expect(200);
            expect(response.body).toHaveLength(1);
        });
    });

    describe("Creating a user", () => {
        const dummyUserCopy = {...dummyUser};
        dummyUserCopy.username = "root2";

        test("posting a new user returns status 200", async () => {
            await api.post("/api/users").send(dummyUserCopy).expect(201);
        });
        test("posting a new user adds it to the database", async () => {
            await api.post("/api/users").send(dummyUserCopy).expect(201);
            expect(await userHelper.amountInDb()).toBe(2);
        });
        test("posting fails with status 400 if username taken", async () => {
            await api.post("/api/users").send(dummyUser).expect(400);
            expect(await userHelper.amountInDb()).toBe(1);
        });

        test("Posting fails with correct status and error message if invalid username", async () => {
            const wrongUsernameCopy = {dummyUserCopy};
            wrongUsernameCopy.username = "ed";
            const response = await api.post("/api/users").send(wrongUsernameCopy).expect(400);
            expect(response.body.error).toBeDefined();
            expect(await userHelper.amountInDb()).toBe(1);
        });
        test("Posting fails with correct status and error message if invalid password", async () => {
            const wrongUsernameCopy = {dummyUserCopy};
            wrongUsernameCopy.password = "pa";
            const response = await api.post("/api/users").send(wrongUsernameCopy).expect(400);
            expect(response.body.error).toBeDefined();
            expect(await userHelper.amountInDb()).toBe(1);
        });
    });

    beforeEach(async () => {

        await User.deleteMany({});
        const user = new User(dummyUserWithHash); 
        await user.save();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});