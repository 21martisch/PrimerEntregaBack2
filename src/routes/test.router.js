const express = require('express');
const router = express.Router();
const transporter = require('../config/nodemailer.config');

router.get('/test-email', async (req, res) => {
    const mailOptions = {
        from: '"E-commerce" <martina@gmail.com>',
        to: 'martinaschaller12@gmail.com',
        subject: 'Correo de prueba',
        html: '<h1>Si ves esto, Nodemailer funciona 🎉</h1>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar correo de prueba:', error);
            res.status(500).json({ message: 'Error al enviar correo de prueba' });
        } else {
            console.log('Correo de prueba enviado:', info.response);
            res.json({ message: 'Correo de prueba enviado' });
        }
    });
});

module.exports = router;