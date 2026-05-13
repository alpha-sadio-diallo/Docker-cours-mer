const express = require('express');
const client = require('prom-client');
const { add, sub, mul, div } = require('./calculator');

const app = express();
const PORT = process.env.PORT || 8000;

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const requestCounter = new client.Counter({
  name: 'calculator_request_count_total',
  help: 'Nombre total de requêtes reçues',
  labelNames: ['method', 'route', 'statusCode']
});

const requestDuration = new client.Histogram({
  name: 'calculator_request_duration_seconds',
  help: 'Durée des requêtes HTTP en secondes',
  labelNames: ['method', 'route', 'statusCode'],
  buckets: [0.005, 0.01, 0.05, 0.1, 0.3, 1, 2, 5]
});

register.registerMetric(requestCounter);
register.registerMetric(requestDuration);

// Middleware pour parser les paramètres
app.use(express.json());

// Middleware de collecte des métriques
app.use((req, res, next) => {
  const start = process.hrtime();
  const originalEnd = res.end;

  res.end = function (chunk, encoding, callback) {
    const diff = process.hrtime(start);
    const durationSeconds = diff[0] + diff[1] / 1e9;
    const statusCode = res.statusCode ? res.statusCode.toString() : '200';

    requestDuration.labels(req.method, req.path, statusCode).observe(durationSeconds);
    requestCounter.labels(req.method, req.path, statusCode).inc();

    return originalEnd.call(this, chunk, encoding, callback);
  };

  next();
});

// Route d'accueil
app.get('/', (req, res) => {
  res.json({
    message: 'API Calculatrice',
    routes: {
      add: '/add?a=4&b=2',
      sub: '/sub?a=9&b=3',
      mul: '/mul?a=5&b=4',
      div: '/div?a=12&b=2',
      metrics: '/metrics'
    }
  });
});

// Route pour l'addition
app.get('/add', (req, res) => {
  try {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

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

// Route des métriques Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`API Calculatrice démarrée sur http://localhost:${PORT}`);
});

module.exports = app;
