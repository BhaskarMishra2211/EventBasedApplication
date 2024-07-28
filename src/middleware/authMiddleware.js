// authMiddleware.js
const supabase = require('../../supabase');

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = authenticate;
