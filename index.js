const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importez le module CORS

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Utilisez le middleware CORS pour activer CORS pour toutes les routes

let tickets = [];

// Créer un ticket
app.post('/tickets', (req, res) => {
    const data = req.body;
    tickets.push(data);
    res.status(201).json({ message: 'Ticket créé avec succès' });
});

// Récupérer tous les tickets
app.get('/tickets', (req, res) => {
    res.json(tickets);
});

// Récupérer un ticket spécifique
app.get('/tickets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const ticket = tickets.find(ticket => ticket.id === id);
    if (ticket) {
        res.json(ticket);
    } else {
        res.status(404).json({ message: 'Ticket non trouvé' });
    }
});

// Modifier un ticket
app.put('/tickets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    const index = tickets.findIndex(ticket => ticket.id === id);
    if (index !== -1) {
        tickets[index] = { ...tickets[index], ...data };
        res.json({ message: 'Ticket mis à jour avec succès' });
    } else {
        res.status(404).json({ message: 'Ticket non trouvé' });
    }
});

// Supprimer un ticket spécifique
app.delete('/tickets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tickets.findIndex(ticket => ticket.id === id);
    if (index !== -1) {
        tickets.splice(index, 1);
        res.json({ message: 'Ticket supprimé avec succès' });
    } else {
        res.status(404).json({ message: 'Ticket non trouvé' });
    }
});

// Réinitialiser les tickets
app.post('/reset', (req, res) => {
    tickets = [];
    res.json({ message: 'Tickets réinitialisés avec succès' });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
