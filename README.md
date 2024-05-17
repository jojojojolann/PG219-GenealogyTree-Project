# MyTree

## Description
MyTree est une application de généalogie conçue pour vous permettre de créer et de visualiser votre arbre généalogique. Elle offre des fonctionnalités d'inscription et de connexion sécurisées, permettant à chaque utilisateur de sauvegarder et de gérer son propre arbre généalogique.

## Fonctionnalités
- Inscription et connexion des utilisateurs.
- Ajout, modification, et suppression de membres de l'arbre généalogique.
- Visualisation interactive de l'arbre généalogique.

## Technologie
MyTree est développée avec une pile technologique MERN (MongoDB, Express.js, Vue, Node.js).

## Prérequis
- Node.js
- MongoDB

## Installation

### Configuration de l'environnement client
1. Accédez au dossier client : `PG219-GenealogyTree-Project/src/client`
2. Installez les dépendances : `npm install`
4. Pour le développement mobile avec Cordova, suivez les instructions spécifiques à Cordova.

### Configuration de l'environnement backend
1. Clonez le dépôt Git : `git clone <url_du_dépôt>`
2. Accédez au dossier : `cd PG219-GenealogyTree-Project/src`
3. Installez les dépendances : `npm install`
4. Lancez le serveur : `npm run dev`

## Répartition
1. Mathieu ANTOINE : Page HomeView et Affichage de l'arbre.
2. Jolann MADEC : Login/Register (JWT) et gestion des erreurs, Protection des routes, CSS, Rôle utilisateurs, API users (GET, POST, PUT, DELETE), API people (GET, POST, PUT, DELETE) et BDD

## Fonctionnalités

MyTree propose les fonctionnalités suivantes :

- **Inscription et Connexion** : Système sécurisé d'authentification des utilisateurs.
- **Gestion des Membres** : Ajout, modification, et suppression de membres dans l'arbre généalogique.
- **Visualisation Interactive** : Affichage interactif et intuitif de l'arbre généalogique.
- **Protection des Routes** : Accès sécurisé aux différentes parties de l'application selon le rôle de l'utilisateur.
- **API RESTful** : Gestion des utilisateurs et des membres de l'arbre via des API (GET, POST, PUT, DELETE).
- **Design Responsive** : Interface utilisateur adaptative et stylisée avec CSS.

