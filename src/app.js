const express = require('express');
const { add, sub, mul, div } = require('./calculator');

const app = express();
const PORT = 3000;

// Middleware pour parser les paramètres
app.use(express.json());

// Route d'accueil
app.get('/', (req, res) => {
  res.json({
    message: 'API Calculatrice',
    routes: {
      add: '/add?a=4&b=2',
      sub: '/sub?a=9&b=3',
      mul: '/mul?a=5&b=4',
      div: '/div?a=12&b=2'
    }
  });
});

// Route pour l'addition
app.get('/add', (req, res) => {
  try {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    // Validation des paramètres
    if (isNaN(a) || isNaN(b)) {
      return res.status(400).json({ error: 'Paramètres invalides' });
    }

    const result = add(a, b);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour la soustraction
app.get('/sub', (req, res) => {
  try {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    if (isNaN(a) || isNaN(b)) {
      return res.status(400).json({ error: 'Paramètres invalides' });
    }

    const result = sub(a, b);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour la multiplication
app.get('/mul', (req, res) => {
  try {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    if (isNaN(a) || isNaN(b)) {
      return res.status(400).json({ error: 'Paramètres invalides' });
    }

    const result = mul(a, b);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour la division
app.get('/div', (req, res) => {
  try {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    if (isNaN(a) || isNaN(b)) {
      return res.status(400).json({ error: 'Paramètres invalides' });
    }

    const result = div(a, b);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`API Calculatrice démarrée sur http://localhost:${PORT}`);
});

module.exports = app;
