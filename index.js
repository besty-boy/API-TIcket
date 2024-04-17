const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Configuration de la connexion MongoDB
const uri = "mongodb+srv://bbarraud:zhA8j6LLYvHwm3A@cluster0.nt66h53.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

let db; // Déclarer db au niveau global

client.connect().then(client => {
    db = client.db("bestyboy"); // Utiliser la base de données "bestyboy"
    console.log("Connected successfully to MongoDB");
    // Démarrage du serveur une fois la connexion MongoDB établie
    app.listen(port, () => {
        console.log(`Serveur démarré sur http://localhost:${port}`);
    });
}).catch(err => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
});

// Routes pour les tickets
app.post('/tickets', async (req, res) => {
    const data = req.body;
    try {
        const collection = db.collection('ticket'); // S'assurer que le nom de la collection est correct
        const result = await collection.insertOne(data);
        res.status(201).json({ message: 'Ticket créé avec succès', id: result.insertedId });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.get('/tickets', async (req, res) => {
    try {
        const collection = db.collection('ticket');
        const tickets = await collection.find({}).toArray();
        res.json(tickets);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.get('/tickets/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const collection = db.collection('ticket');
        const ticket = await collection.findOne({ _id: new MongoClient.ObjectId(id) });
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
    const id = req.params.id;
    const data = req.body;
    try {
        const collection = db.collection('ticket');
        const result = await collection.updateOne({ _id: new MongoClient.ObjectId(id) }, { $set: data });
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
    const id = req.params.id;
    try {
        const collection = db.collection('ticket');
        const result = await collection.deleteOne({ _id: new MongoClient.ObjectId(id) });
        if (result.deletedCount) {
            res.json({ message: 'Ticket supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Ticket non trouvé' });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Routes pour les produits
app.post('/products', async (req, res) => {
    const { Projet, lien, description, image_pc, image_mobile } = req.body;
    if (!Projet || !lien) {
        res.status(400).json({ message: 'Le nom du projet et le lien sont requis' });
        return;
    }
    try {
        const collection = db.collection('product');
        const product = { Projet, lien, description, image_pc, image_mobile };
        const result = await collection.insertOne(product);
        res.status(201).json({ message: 'Produit ajouté avec succès', product });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.get('/products', async (req, res) => {
    try {
        const collection = db.collection('product');
        const products = await collection.find({}).toArray();
        res.json(products);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.delete('/products/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const collection = db.collection('product');
        const result = await collection.deleteOne({ _id: new MongoClient.ObjectId(id) });
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
    // Cette route n'a plus de sens avec une base de données MongoDB car elle implique la gestion d'une liste en mémoire
    res.status(400).json({ message: "Cette fonctionnalité n'est pas implémentée." });
});
