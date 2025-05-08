const { UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided', 401);
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email, id, name } = decoded;
        req.user = { email, id, name };
        next();
    } catch (error) {
        throw new UnauthenticatedError('Access denied. Not authorized', 401);
    }
};

module.exports = authenticationMiddleware;