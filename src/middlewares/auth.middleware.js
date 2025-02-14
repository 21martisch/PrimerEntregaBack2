const jwt = require('jsonwebtoken');
const User = require('../dao/models/user.model.js');

const auth = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized: No token provided' });
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({ message: 'Forbidden: No tienes permisos' });
            }

            req.user = {
                id: user._id,
                role: user.role
            };
            next();
        } catch (error) {
            res.status(500).json({ message: 'Error en la autenticación' });
        }
    };
};

module.exports = auth;


