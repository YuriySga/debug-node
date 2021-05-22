const express = require('express');
const app = express();
const db = require('./db');
const { router }= require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');
const valSession = require('./middleware/validate-session');

db.sync();

app.use(express.json());

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
      res.send('Service is running!');
      return;
    }
    next();
  });

app.use('/api/auth', router);
app.use(valSession);
app.use('/api/game', game);

app.listen(4000, () => console.log("App is listening on 4000"));