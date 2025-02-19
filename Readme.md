# SEO Generator

Ce projet est un générateur de schémas JSON-LD pour différentes entités telles que les organisations, les personnes, les offres, les produits et les événements. Il utilise Express pour le backend et Vue.js pour le frontend.

## Installation

### Backend (API)

1. Accédez au répertoire `api` :
    ```sh
    cd api
    ```

2. Installez les dépendances :
    ```sh
    npm install
    ```

3. Démarrez le serveur de développement :
    ```sh
    npm run dev
    ```

### Frontend

1. Accédez au répertoire [front](http://_vscodecontentref_/20) :
    ```sh
    cd front
    ```

2. Installez les dépendances :
    ```sh
    npm install
    ```

3. Démarrez le serveur de développement :
    ```sh
    npm run dev
    ```

## Utilisation

### API

L'API expose plusieurs points de terminaison pour générer des schémas JSON-LD :

- `POST /api/organization` : Génère un schéma pour une organisation.
- `POST /api/person` : Génère un schéma pour une personne.
- `POST /api/offers` : Génère un schéma pour une offre.
- `POST /api/product` : Génère un schéma pour un produit.
- `POST /api/event` : Génère un schéma pour un événement.

### Frontend

Le frontend permet de saisir les informations nécessaires pour chaque type d'entité et de générer les schémas JSON-LD correspondants. Les vues disponibles sont :

- [HomeView](http://_vscodecontentref_/21) : Vue d'accueil pour sélectionner le type d'entité.
- `PersonView` : Vue pour saisir les informations d'une personne.
- `OrganizationView` : Vue pour saisir les informations d'une organisation.
- `OfferView` : Vue pour saisir les informations d'une offre.
- `ProductView` : Vue pour saisir les informations d'un produit.
- `EventView` : Vue pour saisir les informations d'un événement.

