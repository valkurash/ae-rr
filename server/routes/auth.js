const express = require('express');
const fsUtils = require('../utils/fs');

const { getEndpointData } = fsUtils;
const AuthRouter = express.Router();

AuthRouter.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password) {
        res.status(200);
        setTimeout(() => res.json(getEndpointData('auth/admin')), 3000);
    } else if (username === 'user' && password) {
        res.status(200);
        setTimeout(() => res.json(getEndpointData('auth/user')), 3000);
    } else if (username === 'bob' && password) {
        res.status(500);
        setTimeout(
            () =>
                res.json({
                    timestamp: '2019-05-28T08:47:24.344+0000',
                    status: 500,
                    error: 'Internal Server Error',
                    message: 'GENERAL',
                }),
            2000,
        );
    } else {
        res.status(403);
        setTimeout(
            () =>
                res.json({
                    code: 'FORBIDDEN',
                    message: 'User authentication failed.',
                    checks: null,
                }),
            2000,
        );
    }
});

AuthRouter.get('/logoff', (req, res) => {
    res.sendStatus(200);
});

module.exports = AuthRouter;
