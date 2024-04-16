const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Connexion à MongoDB
mongoose.connect('votre_uri_mongodb', { useNewUrlParser: true, useUnifiedTopology: true });

// Schéma pour les tickets
const TicketSchema = new mongoose.Schema({
  description: String,
  // autres champs...
});

const Ticket = mongoose.model('Ticket', TicketSchema);

// Schéma pour les produits
const ProductSchema = new mongoose.Schema({
  Projet: String,
  lien: String,
  description: String,
  image_pc: String,
  image_mobile: String
});

const Product = mongoose.model('Product', ProductSchema);

// Routes pour les tickets utilisant MongoDB
app.post('/tickets', async (req, res) => {
  const newTicket = new Ticket(req.body);
  await newTicket.save();
  res.status(201).json({ message: 'Ticket créé avec succès', ticket: newTicket });
});

app.get('/tickets', async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
});

app.get('/tickets/:id', async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404).json({ message: 'Ticket non trouvé' });
  }
});

app.put('/tickets/:id', async (req, res) => {
  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (updatedTicket) {
    res.json({ message: 'Ticket mis à jour avec succès', ticket: updatedTicket });
  } else {
    res.status(404).json({ message: 'Ticket non trouvé' });
  }
});

app.delete('/tickets/:id', async (req, res) => {
  const result = await Ticket.findByIdAndDelete(req.params.id);
  if (result) {
    res.json({ message: 'Ticket supprimé avec succès' });
  } else {
    res.status(404).json({ message: 'Ticket non trouvé' });
  }
});


app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
