# Chapter 0

Chapter 0 est une plateforme collaborative pour passionnées d'écriture et de littérature. Elle est un espace de création et d'échange. Elle permet de centraliser les différentes étapes du processus d'écritures, de rédaction, de correction et de traduction.

## Objectifs

- Permettre aux auteurs de se concentrer sur leurs propres projets, en utilisant une plateforme intuitive, responsive et accessible pensées pour les auteurs.
- Permettre aux auteurs de partager leurs projets avec des beta-readers afin d'avoir leur retour et améliorer leur projet.
- Les auteurs d'un projet héritent du rôle de owner du projet. En dehors de l'administrateur ce sont les seul a poivoir gérer le projet et les membres qui y ont accès.

## Rôles

- Owner : Le propriétaire d'un projet. Il peut modifier le projet et ajouter des membres.
- Admin : Gestionnaire de la plateforme. Il peut ajouter des membres et modifier les rôles des membres.
- Membre : Un utilisateur qui peut accéder au projet et y travailler.

## Collaboration

Les utilisateurs peuvent rejoindre un projet grace a l'ID de celui ci transmis par l'owner du projet.Ce dernier doit alors accèder a l'espace de collaboration du projet et accepter la demander et attribuer un rôle au nouvel utilisateur.
Les membres peuvent modifier leursinformations et les propriétaires du projet.

## Organisation

Un utilisateur peut créer plusieurs projets avec un compte unique et participer à plusieurs projets en même temps.

## Développement

Le projet est développé en TypeScript.

Le backend est développé en NodeJS avec ExpressJS. La base de données est PostgreSQL avec l'ORM Drizzle.

Le frontend est développé en ReactJS. Zustand est utilisé pour gérer l'état du projet et TanStackQuery pour la communication avec la base de données.

## Structure du projet

Le frontend est developpé avec une approche utilisant l'atomic design.

📁 frontend/
├── assets/
├── components/
├── routing/
├── store/
├── App.tsx
└── main.tsx

📁 backend/
├── controllers/
├── db/
├── lib/
├── middleware/
├── routers/
└── server.ts

## Installation

Pour installer le projet, il faut d'abord installer les dépendances du projet.

### 1. Backend

cd backend
npm install
npm run dev # pour lancer le servur
npm dev:watch # pour lancer le serveur en watch mode

### 2. Frontend

cd frontend
npm install
npm run dev

## Licence

📜 Licence
© 2025 - Chapter0. Tous droits réservés.
Les auteurs conservent l'entière propriété de leurs projets.
