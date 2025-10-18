const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Access denied!' });
    }
    try {
        req.user = jwt.verify(
            token,
            process.env.SECRET_KEY || 'fK!9z@N3pL#xR7uD$tV2yWqE0mH^bS6a'
        );
        next();
    } catch (error) {
        res.status(422).send({ message: 'Invalid token' });
    }
};