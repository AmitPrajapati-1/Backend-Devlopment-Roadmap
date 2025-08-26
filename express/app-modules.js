const express = require('express');
const app = express();

// app level settings
app.set('view engine', 'ejs');

// routing
app.get('/', (req, res) => {
  res.send('Hello World from Express');
});

app.post('/app/data', (req, res) => {
  res.json({
    message: 'Data received',
    data: req.body
  });
});

// normal middleware (runs for all requests)
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// error-handling middleware (always last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
