const Event = require('../models/event.model');
const User = require('../models/user.model');
const axios = require('axios');

exports.createEvent = async ({ name, userid, date, location, description }) => {
    console.log("Inside Dao ....")
    try {
        console.log("Inside try...")
        const user = await User.findOne({ supabaseId: userid });
        console.log("Inside User find one....");
        if (!user) {
            throw new Error('User not found');
        }
        const newEvent = new Event({
            name,
            date,
            location,
            description,
            user: user._id // Use the MongoDB ObjectId here
        });
        let res = await newEvent.save();
        return res;
    } catch (error) {
        throw error; // Throw the error instead of returning the message
    }
};

exports.getAllEvents = async (userid) => {
    try {
        const user = await User.findOne({ supabaseId: userid });
        const events = await Event.find({ user: user._id });
        return events;
    } catch (error) {
        return error.message;
    }
};

exports.updateEvent = async ({name,date,location,description,id,userid}) => {
    try {
        // console.log("User Id : ",userid);
        const user = await User.findOne({ supabaseId: userid });
        // console.log("User Id : ",userid);
        const event = await Event.findOneAndUpdate(
            { _id: id, user: user._id },
            { name, date, location, description },
            { new: true }
        );
        if (!event) {
            return "Event Not Found...!";
        }
        return event;
    } catch (error) {
        return error.message;
    }
};

exports.deleteEvent = async (supabaseId, eventId) => {
    try {
        // First, find the user by their Supabase ID
        const user = await User.findOne({ supabaseId: supabaseId });
        if (!user) {
            throw new Error('User not found');
        }

        // Now use the user's MongoDB _id to delete the event
        const deletedEvent = await Event.findOneAndDelete({ _id: eventId, user: user._id });
        if (!deletedEvent) {
            throw new Error('Event not found or user not authorized to delete this event');
        }
        return deletedEvent;
    } catch (error) {
        console.error('Error in deleteEvent:', error);
        throw error;
    }
};

exports.getWeatherForEvent = async (userid, id) => {

    console.log("Inside Weather dao Function.....")
    try {
        const user = await User.findOne({ supabaseId: userid });
        const event = await Event.findOne({ user: user._id });
        console.log("Event : ",event);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${event.location}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`);
        data = ({
            event: event,
            weather: response.data
        });
        return data;
    } catch (error) {
        return error.message;
    }
};
