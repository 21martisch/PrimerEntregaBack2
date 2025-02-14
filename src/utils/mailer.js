const transporter = require('../config/nodemailer.config');

const sendMail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `"E-commerce" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        });
        console.log('Correo enviado con éxito a:', to);
    } catch (error) {
        console.error('Error al enviar correo:', error);
    }
};

module.exports = sendMail;
