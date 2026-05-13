# Calculator API 

API REST de calculatrice en JavaScript avec Node.js, conteneurisée avec Docker et testée avec Jest.

## Architecture du projet

```
Docker-cours-mer/
│
├── src/
│   ├── app.js
│   ├── calculator.js
│
├── tests/
│   ├── calculator.test.js
│
├── package.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Installation

### Prérequis
- Docker et Docker Compose installés
- Node.js 18+ (optionnel, if running locally)

### Installation locale

```bash
npm install
```

## Utilisation

### Démarrer l'application avec Docker

```bash
docker compose up
```

L'API sera accessible à `http://localhost:3000`

### Exécuter les tests

#### Localement
```bash
npm test
```

#### Dans Docker
```bash
docker compose exec api npm test
```

## Routes disponibles

### Addition
```
GET /add?a=4&b=2
```
Réponse :
```json
{
  "result": 6
}
```

### Soustraction
```
GET /sub?a=9&b=3
```
Réponse :
```json
{
  "result": 6
}
```

### Multiplication
```
GET /mul?a=5&b=4
```
Réponse :
```json
{
  "result": 20
}
```

### Division
```
GET /div?a=12&b=2
```
Réponse :
```json
{
  "result": 6
}
```

## Gestion des erreurs

### Paramètres invalides
```bash
curl "http://localhost:3000/add?a=abc&b=2"
```
Réponse :
```json
{
  "error": "Paramètres invalides"
}
```

### Division par zéro
```bash
curl "http://localhost:3000/div?a=10&b=0"
```
Réponse :
```json
{
  "error": "Division par zéro"
}
```

## Fichier des tests

Consultez [tests/calculator.test.js](tests/calculator.test.js) pour voir les tests automatiques avec Jest.

Les tests vérifient :
- ✅ Addition : 2 + 3 = 5
- ✅ Soustraction : 8 - 2 = 6
- ✅ Multiplication : 4 × 3 = 12
- ✅ Division : 10 / 2 = 5
- ✅ Division par zéro : génère une erreur

## Technologies utilisées

- JavaScript
- Node.js
- Express.js
- Docker
- Docker Compose
- Jest
