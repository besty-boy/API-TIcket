const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Ajouter un ticket
app.post('/tickets', async (req, res) => {
    const newTicket = req.body;
    try {
        const data = await fs.readFile('tickets.json');
        const tickets = JSON.parse(data);
        newTicket.id = tickets.length + 1;  
        tickets.push(newTicket);
        await fs.writeFile('tickets.json', JSON.stringify(tickets));
        res.status(201).json({ message: 'Ticket créé avec succès', ticket: newTicket });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Récupérer tous les tickets
app.get('/tickets', async (req, res) => {
    try {
        const data = await fs.readFile('tickets.json');
        const tickets = JSON.parse(data);
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Supprimer un ticket
app.delete('/tickets/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const data = await fs.readFile('tickets.json');
        let tickets = JSON.parse(data);
        const index = tickets.findIndex(ticket => ticket.id === id);
        if (index !== -1) {
            tickets.splice(index, 1);
            await fs.writeFile('tickets.json', JSON.stringify(tickets));
            res.json({ message: 'Ticket supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Ticket non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ajouter un produit
app.post('/products', async (req, res) => {
    const newProduct = req.body;
    try {
        const data = await fs.readFile('products.json');
        const products = JSON.parse(data);
        newProduct.id = products.length + 1;  
        products.push(newProduct);
        await fs.writeFile('products.json', JSON.stringify(products));
        res.status(201).json({ message: 'Produit ajouté avec succès', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Récupérer tous les produits
app.get('/products', async (req, res) => {
    try {
        const data = await fs.readFile('products.json');
        const products = JSON.parse(data);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Supprimer un produit
app.delete('/products/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const data = await fs.readFile('products.json');
        let products = JSON.parse(data);
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products.splice(index, 1);
            await fs.writeFile('products.json', JSON.stringify(products));
            res.json({ message: 'Produit supprimé avec succès' });
        } else {
            res.status(404).send('Produit non trouvé');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
