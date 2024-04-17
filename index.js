const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let tickets = [];
let nextTicketId = 1;
app.post('/tickets', async (req, res) => {
    const data = req.body;
    try {
        const collection = db.collection('tickets');
        const result = await collection.insertOne(data);
        res.status(201).json({ message: 'Ticket créé avec succès', id: result.insertedId });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.get('/tickets', async (req, res) => {
    try {
        const collection = db.collection('tickets');
        const tickets = await collection.find({}).toArray();
        res.json(tickets);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.get('/tickets/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const collection = db.collection('tickets');
        const ticket = await collection.findOne({ id: id });
        if (ticket) {
            res.json(ticket);
        } else {
            res.status(404).json({ message: 'Ticket non trouvé' });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.put('/tickets/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    try {
        const collection = db.collection('tickets');
        const result = await collection.updateOne({ id: id }, { $set: data });
        if (result.matchedCount) {
            res.json({ message: 'Ticket mis à jour avec succès' });
        } else {
            res.status(404).json({ message: 'Ticket non trouvé' });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.delete('/tickets/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const collection = db.collection('tickets');
        const result = await collection.deleteOne({ id: id });
        if (result.deletedCount) {
            res.json({ message: 'Ticket supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Ticket non trouvé' });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


let products = [];
let nextProductId = 1;
app.post('/product', async (req, res) => {
    const { Projet, lien, description, image_pc, image_mobile } = req.body;
    if (!Projet || !lien) {
        res.status(400).json({ message: 'Le nom du projet et le lien sont requis' });
        return;
    }
    try {
        const collection = db.collection('products');
        const product = {
            Projet,
            lien,
            description,
            image_pc,
            image_mobile
        };
        const result = await collection.insertOne(product);
        res.status(201).json({ message: 'Produit ajouté avec succès', product });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.get('/products', async (req, res) => {
    try {
        const collection = db.collection('products');
        const products = await collection.find({}).toArray();
        res.json(products);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.delete('/products/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const collection = db.collection('products');
        const result = await collection.deleteOne({ id: id });
        if (result.deletedCount) {
            res.json({ message: 'Produit supprimé avec succès' });
        } else {
            res.status(404).send('Produit non trouvé');
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


// Réinitialiser les tickets
app.post('/reset', (req, res) => {
    tickets = [];
    nextTicketId = 1;
    res.json({ message: 'Tickets réinitialisés avec succès' });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
