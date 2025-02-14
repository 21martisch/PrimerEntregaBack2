const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserDTO = require('../dao/dtos/user.dto');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const user = req.user;
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.cookie('jwt', token, { httpOnly: true });
  res.json({ message: 'Login successful', token });
});

router.get('/current', auth, (req, res) => {
  const userDTO = new UserDTO(req.user);
  res.json({ user: userDTO });
});

module.exports = router;
