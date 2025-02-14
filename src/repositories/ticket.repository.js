const Ticket = require('../dao/models/ticket.model.js');

class TicketRepository {
    async createTicket(ticketData) {
        return await Ticket.create(ticketData);
    }

    async getTicketByCode(code) {
        return await Ticket.findOne({ code });
    }

    async getTickets() {
        return await Ticket.find();
    }
}

module.exports = new TicketRepository();
