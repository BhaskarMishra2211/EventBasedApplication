const axios = require('axios');
const sessionDao = require('../dao/sessionDao');

exports.createSession = async (userId, ipAddress) => {
    try {
        return await sessionDao.createSession(userId, ipAddress);
    } catch (error) {
        console.error('Error creating session:', error);
        throw error;
    }
};

exports.getUserSessions = async (req, res) => {
    try {
        const sessions = await sessionDao.getUserSessions(req.user.id);
        res.json(sessions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.endSession = async (req, res) => {
    const { sessionId } = req.params;
    try {
        const session = await sessionDao.endSession(req.user.id, sessionId);
        if (!session) {
            return res.status(404).json({ error: 'Active session not found' });
        }
        res.json({ message: 'Session ended successfully', session });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

