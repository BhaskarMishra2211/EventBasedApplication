const eventDao = require('../dao/eventDao');
const axios = require('axios');

exports.createEvent = async (req, res) => {
    console.log("Inside Create Event Controller...")
    console.log("Request Body : ",req.body);
    const { name, userid, date, location, description } = req.body;
    console.log("Name : ", name);

    try {
        console.log("inside try block...")
        const newEvent = await eventDao.createEvent({ name, userid, date, location, description });
        console.log("After dao called....")
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await eventDao.getAllEvents(req.query.userid);
        res.json(events);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    const { id } = req.query;
    const { name, userid , date, location, description } = req.body;
    try {
        const event = await eventDao.updateEvent({name,date,location,description,id,userid});
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    const { id , userid } = req.query;
    try {
        const event = await eventDao.deleteEvent(userid, id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getWeatherForEvent = async (req, res) => {
    const { id , userid} = req.query;
    console.log("Inside Weather Event ....!");
    try {
        const event = await eventDao.getWeatherForEvent(userid, id);
        console.log("Event Dao Method Called .....");
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${event.location}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`);
        /* res.json({
            event: event,
            weather: response.data
        }); */

        res.json(event);
    } catch (error) {
        res.status(400).json({ error: 'Unable to fetch weather data' });
    }
};

