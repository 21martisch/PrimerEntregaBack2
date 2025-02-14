const express = require('express');
const User = require('../dao/models/user.model.js');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const newUser = new User({ first_name, last_name, email, age, password, role });
    await newUser.save();

    res.status(201).json({ message: 'Usuario creado correctamente', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
});

module.exports = router;
