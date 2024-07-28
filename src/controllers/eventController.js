const eventDao = require('../dao/eventDao');
const axios = require('axios');

exports.createEvent = async (req, res) => {
    const { name, date, location, description } = req.body;
    try {
        const newEvent = await eventDao.createEvent(req.user.id, { name, date, location, description });
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await eventDao.getAllEvents(req.user.id);
        res.json(events);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, date, location, description } = req.body;
    try {
        const event = await eventDao.updateEvent(req.user.id, id, { name, date, location, description });
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await eventDao.deleteEvent(req.user.id, id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getWeatherForEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await eventDao.getEventById(req.user.id, id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${event.location}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`);
        res.json({
            event: event,
            weather: response.data
        });
    } catch (error) {
        res.status(400).json({ error: 'Unable to fetch weather data' });
    }
};





// const Event = require('../models/event.model');
// const User = require('../models/user.model');
// const axios = require('axios');

// exports.createEvent = async (req, res) => {
//     const { name, date, location, description } = req.body;
//     try {
//         const user = await User.findOne({ supabaseId: req.user.id });
//         const newEvent = new Event({
//             name,
//             date,
//             location,
//             description,
//             user: user._id
//         });
//         await newEvent.save();
//         res.status(201).json(newEvent);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// exports.getAllEvents = async (req, res) => {
//     try {
//         const user = await User.findOne({ supabaseId: req.user.id });
//         const events = await Event.find({ user: user._id });
//         res.json(events);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// exports.updateEvent = async (req, res) => {
//     const { id } = req.params;
//     const { name, date, location, description } = req.body;
//     try {
//         const user = await User.findOne({ supabaseId: req.user.id });
//         const event = await Event.findOneAndUpdate(
//             { _id: id, user: user._id },
//             { name, date, location, description },
//             { new: true }
//         );
//         if (!event) {
//             return res.status(404).json({ error: 'Event not found' });
//         }
//         res.json(event);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// exports.deleteEvent = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const user = await User.findOne({ supabaseId: req.user.id });
//         const event = await Event.findOneAndDelete({ _id: id, user: user._id });
//         if (!event) {
//             return res.status(404).json({ error: 'Event not found' });
//         }
//         res.json({ message: 'Event deleted successfully' });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// exports.getWeatherForEvent = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const user = await User.findOne({ supabaseId: req.user.id });
//         const event = await Event.findOne({ _id: id, user: user._id });
//         if (!event) {
//             return res.status(404).json({ error: 'Event not found' });
//         }

//         const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${event.location}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`);
//         res.json({
//             event: event,
//             weather: response.data
//         });
//     } catch (error) {
//         res.status(400).json({ error: 'Unable to fetch weather data' });
//     }
// };