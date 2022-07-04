const jwt = require("jsonwebtoken");
const config = require("./utils/config");
const User = require("./models/user");

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        const token = authorization.substring(7);
        request.token = token;
    }
    next();
};
const userExtractor = async (request, response, next) => {
    const token = request.token;
    if (!token) return next();
    
    const decodedToken = jwt.verify(token, config.SECRET);
    const user = await User.findById(decodedToken.id);
    if (!user) return next();
    request.user = user;
    next();
};

module.exports = {
    tokenExtractor,
    userExtractor,
};