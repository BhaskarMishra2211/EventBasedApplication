const Event = require('../models/event.model');
const User = require('../models/user.model');
const axios = require('axios');


exports.createSession = async (userId, ipAddress) => {
    try {
        const session = new Session({
            user: userId,
            loginTime: new Date(),
            ipAddress: ipAddress
        });
        await session.save();
        return session;
    } catch (error) {
        console.error('Error creating session:', error);
        throw error;
    }
};

exports.getUserSessions = async (req, res) => {
    try {
        const user = await User.findOne({ supabaseId: req.user.id });
        const sessions = await Session.find({ user: user._id })
            .sort({ loginTime: -1 })
            .limit(10); // Get the last 10 sessions
        res.json(sessions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.endSession = async (req, res) => {
    const { sessionId } = req.params;
    try {
        const user = await User.findOne({ supabaseId: req.user.id });
        const session = await Session.findOneAndUpdate(
            { _id: sessionId, user: user._id, logoutTime: null },
            { logoutTime: new Date() },
            { new: true }
        );
        if (!session) {
            return res.status(404).json({ error: 'Active session not found' });
        }
        res.json({ message: 'Session ended successfully', session });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};