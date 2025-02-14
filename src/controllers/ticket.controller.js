const TicketService = require('../services/ticket.services');
const sendMail = require('../utils/mailer');

const purchase = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const ticket = await TicketService.createTicket(req.params.cid);

        const htmlContent = `
            <h1>¡Gracias por tu compra!</h1>
            <p>Hola ${req.user.first_name},</p>
            <p>Tu compra ha sido procesada exitosamente.</p>
            <h3>Resumen del pedido:</h3>
            <ul>
                ${ticket.products.map(p => 
                    `<li>${p.title} - Cantidad: ${p.quantity} - Precio: $${p.price}</li>`
                ).join('')}
            </ul>
            <p><b>Total: $${ticket.amount}</b></p>
            <p>Código de compra: <b>${ticket.code}</b></p>
            <p>Fecha de compra: ${ticket.purchase_datetime}</p>
            <hr/>
            <p>¡Esperamos que disfrutes de tus productos!</p>
        `;

        await sendMail(userEmail, '¡Compra realizada con éxito!', htmlContent);

        res.status(201).json({
            message: 'Compra realizada y correo enviado',
            ticket
        });
    } catch (error) {
        console.error('Error en la compra:', error);
        res.status(500).json({ message: 'Error en la compra' });
    }
};

module.exports = { purchase };