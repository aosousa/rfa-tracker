const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const authMiddleware = {};

/**
 * Generate a new JWT 
 * @param {string} username 
 */
authMiddleware.generateToken = (username) => {
    const tokenSecret = dotenv.config().parsed.TOKEN_SECRET;

    return jwt.sign({ username }, tokenSecret, { expiresIn: '604800s' });
}

/**
 * Verify the validity of a JWT
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Callback method
 */
authMiddleware.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenSecret = dotenv.config().parsed.TOKEN_SECRET;

    if (token === null) {
        return res.status(500).send({
            status: false,
            data: null,
            error: "Missing token"
        });
    }

    jwt.verify(token, tokenSecret, (error, result) => {
        if (error) {
            return res.status(500).send({
                status: false,
                data: null,
                error
            });
        }

        next();
    });
}

module.exports = authMiddleware;