const express = require('express');

const MockRouter = express.Router();

MockRouter.get('/info', (req, res) => {
    res.status(200);
    setTimeout(() => res.json({data: {name: 'Ivan.Ivanov'}}), 3000);
});

module.exports = MockRouter;
