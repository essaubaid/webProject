const Events = require('../models/Events');

const router = require("express").Router();

router.get("/getEvents", async (req, res) => {
    const allEvents = await Events.find({});

    const MapEvents = [];

    allEvents.forEach(element => {
        MapEvents.push(element);
    });

    try {
        res.status(207).json(MapEvents);
    }
    catch (err) {
        res.status(507).json(err);
    }
});

module.exports = router;