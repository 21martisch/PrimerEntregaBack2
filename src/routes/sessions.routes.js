const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const user = req.user;
  const token = jwt.sign({ id: user._id }, 'yourSecretKey', { expiresIn: '1d' });
  res.cookie('jwt', token, { httpOnly: true });
  res.json({ message: 'Login successful', token });
});

router.get('/current', (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, 'yourSecretKey', async (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  });
});

module.exports = router;
