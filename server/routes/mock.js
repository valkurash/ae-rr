const express = require('express');

const MockRouter = express.Router();

MockRouter.get('/info/:id', (req, res) => {
    const id = req.params.id;
    let data = {data: {name: 'Ivan.Ivanov'}}
    if (id === 'buyer1') {
        data = { data: { name: 'Buyer.1', chats:['buyer1Chat'] } };
    } else if (id === 'buyer2') {
        data = { data: { name: 'Buyer.2', chats:['buyer2Chat'] } };
    } else if (id === 'seller1') {
        data = { data: { name: 'Seller.1', chats:['buyer1Chat','buyer2Chat'] } };
    }
    res.status(200);
    setTimeout(() => res.json(data), 3000);
});

module.exports = MockRouter;
