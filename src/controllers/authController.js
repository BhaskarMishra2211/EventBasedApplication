// authController.js
const supabase = require('../../supabase');
const User = require('../models/user.model'); // Your user model in MongoDB

// Register a new user
exports.registerUser = async (req, res) => {
    const { email, password, name } = req.body;

    // console.log("inside Register User Function or Controller...!")

    try {
        // Create user in Supabase
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Store additional user information in MongoDB
        const newUser = new User({
            supabaseId: data.user.id,
            email,
            name,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Log in an existing user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Authenticate user with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Create a session record in MongoDB
        const user = await User.findOne({ supabaseId: data.user.id });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Assuming you have a Session model
        const session = new Session({
            userId: user._id,
            loginTime: new Date(),
            ipAddress: req.ip, // Adjust as necessary
        });

        await session.save();
        res.status(200).json({ message: 'Logged in successfully', session: data.session });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
