const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Firebase setup
const firebase = require('firebase/app');
require('firebase/analytics');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdFJeLLB2Qjv66krjvlwsTpFXeKAQkhDQ",
  authDomain: "bestyboy-1313c.firebaseapp.com",
  projectId: "bestyboy-1313c",
  storageBucket: "bestyboy-1313c.appspot.com",
  messagingSenderId: "428300299572",
  appId: "1:428300299572:web:3865fdcca38bc02d1e4961",
  measurementId: "G-2MYV1LSKX2"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const analytics = firebase.getAnalytics(firebaseApp);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let tickets = [];
let nextTicketId = 1;

app.post('/tickets', (req, res) => {
    const data = req.body;
    const id = nextTicketId++;
    data.id = id;
    tickets.push(data);
    res.status(201).json({ message: 'Ticket créé avec succès', id: id });
});

app.get('/tickets', (req, res) => {
    res.json(tickets);
});

app.get('/tickets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const ticket = tickets.find(ticket => ticket.id === id);
    if (ticket) {
        res.json(ticket);
    } else {
        res.status(404).json({ message: 'Ticket non trouvé' });
    }
});

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

// Gestion des produits avec un tableau simple en mémoire
let products = [];
let nextProductId = 1;

app.post('/products', (req, res) => {
    const { Projet, lien, description, image_pc, image_mobile } = req.body;
    if (!Projet || !lien) {
        res.status(400).json({ message: 'Le nom du projet et le lien sont requis' });
        return;
    }
    const product = {
        id: nextProductId++,
        Projet,
        lien,
        description,
        image_pc,
        image_mobile
    };
    products.push(product);
    res.status(201).json({ message: 'Produit ajouté avec succès', product });
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        res.json({ message: 'Produit supprimé avec succès' });
    } else {
        res.status(404).send('Produit non trouvé');
    }
});

app.post('/reset', (req, res) => {
    tickets = [];
    nextTicketId = 1;
    res.json({ message: 'Tickets réinitialisés avec succès' });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});