const express = require('express');
const cricketModel = require('./model');

const router = express.Router();

router.get('/:matches', async (req, res) => {
    let data = await cricketModel.find({matches: {$gt: req.params.matches}}).sort({matches: 1}).limit(20);
    return res.json({
        "data": data
    });
});

router.get('/hs/:hs', async (req, res) => {
    let data = await cricketModel.find({hs: {$gt: req.params.hs}}).sort({hs: 1});
    return res.json({
        "data": data
    });
});

router.get('/cricketer/:name', async (req, res) => {
    let data = await cricketModel.findOne({player_name: req.params.name});
    return res.json({
        "data": data
    });
});

router.post('/cricketer', async (req, res) => {
    let data = await cricketModel.deleteOne({player_name: req.body.player_name});
    return res.json({
        "data": 1
    });
});

router.post('/', async (req, res) => {
    let data = await cricketModel.create(req.body);
    return res.json({
        "data": data
    });
})

router.post('/update', async (req, res) => {
    let data = await cricketModel.updateOne({player_name: req.body.player_name}, req.body.update);
    return res.json({
        "data": data
    });
})

module.exports = router;