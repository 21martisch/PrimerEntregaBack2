const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify().then(() => {
    console.log('Configuración de Nodemailer exitosa');
}).catch(err => {
    console.error('Error en configuración de Nodemailer:', err);
});

module.exports = transporter;
