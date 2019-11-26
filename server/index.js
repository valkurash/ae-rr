const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/** Routers. */
const AuthRouter = require('./routes/auth');
const MockRouter = require('./routes/mock');

/** Middlewares. */
const session = require('./middlewares/session');

// Parse application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json.
app.use(bodyParser.json());

// Mimics session expiry and refresh.
app.use(
    session({
        tokenExpiresAfterSeconds: 10 * 60,
        unauthorizedAfterSeconds: 60 * 60,
        tokenRefreshDelayInSeconds: 1,
    }),
);

// CORS.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Expose-Headers', 'Content-Length,Content-Range');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// Routes.
app.use('/api/auth', AuthRouter);
app.use('/api/mock', MockRouter);

// run server
app.listen(8091, () => {
    console.log('Mock server is running at http://localhost:8091');
});
