```markdown
# API Ticket Management System

Une API Express.js pour gérer des tickets et des produits de manière efficace et asynchrone.

> [!NOTE]
> Cette API est conçue pour des démonstrations, à chaque **maj** du fichier, les données enregistrées seront effacées.

## Fonctionnalités

**Tickets**:
- **Créer un ticket**: Ajoute un nouveau ticket à la base de données.
- **Lister tous les tickets**: Récupère tous les tickets enregistrés.
- **Supprimer un ticket**: Supprime un ticket spécifié par son ID.

**Produits**:
- **Ajouter un produit**: Enregistre un nouveau produit dans la base de données.
- **Récupérer tous les produits**: Liste tous les produits disponibles.
- **Supprimer un produit**: Efface un produit spécifié par son ID.

## Installation et mise en route

Suivez ces étapes pour installer l'API et démarrer le serveur localement :

1. Clonez le dépôt Git.
2. Installez Node.js sur votre système.
3. Installez les dépendances avec `npm install`.
4. Lancez le serveur avec `node server.js` ou utilisez `nodemon` pour un rechargement automatique.
5. Le serveur sera accessible via `http://localhost:3000`.

## Utilisation

Vous pouvez tester l'API en utilisant des outils comme Postman ou via des requêtes cURL directement depuis votre terminal. Voici quelques exemples de commandes cURL pour interagir avec l'API :

- **Créer un ticket**:
  ```js
  curl -X POST http://localhost:3000/tickets -H 'Content-Type: application/json' -d '{"title": "New Issue", "description": "Details about the issue."}'
  ```

- **Lister tous les tickets**:
  ```
  curl http://localhost:3000/tickets
  ```

- **Supprimer un ticket**:
  ```
  curl -X DELETE http://localhost:3000/tickets/1
  ```

## Contribution

Toute contribution au projet est la bienvenue. Si vous souhaitez contribuer, veuillez forker le dépôt, créer une branche pour vos modifications et soumettre une pull request.

## Licence

Ce projet est sous licence MIT. Vous pouvez trouver le fichier de licence dans le dépôt principal.
```

