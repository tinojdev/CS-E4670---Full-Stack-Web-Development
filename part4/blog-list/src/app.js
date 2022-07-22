const config = require("./utils/config");

// eslint-disable-next-line no-unused-vars
const http = require("http");
const mongoose = require("mongoose");
const express = require("express");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");

const app = express();
const cors = require("cors");
const loginRouter = require("./controllers/login");

const middleware = require("./middleware");

mongoose.connect(config.MONGO_DB_URI)
    .then(() => console.info("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB", err.message) );




app.use(cors());
app.use(express.json());

app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
    const testingRouter = require("./controllers/test");
    app.use("/api/testing", testingRouter);
}

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});




module.exports = app;