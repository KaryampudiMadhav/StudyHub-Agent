import { connectionDB } from "../config/db.js";
import { ticketModel } from "../models/ticket.model.js";
import { sampleTickets } from "../models/tickets.js";

connectionDB()
await ticketModel.insertMany(sampleTickets);
console.log("Sample tickets inserted!");
