require("dotenv").config();

const ENVIRONMENT = process.env.NODE_ENV;
const SECRET = process.env.SECRET;

const MONGO_DB_URI = ENVIRONMENT === "production"
    ? process.env.MONGODB_PROD
    : process.env.MONGODB_DEV;
const PORT = process.env.PORT || 3003;


module.exports = {
    MONGO_DB_URI,
    PORT,
    ENVIRONMENT,
    SECRET
};