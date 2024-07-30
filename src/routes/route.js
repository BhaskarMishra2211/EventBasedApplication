const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController.js");
const sessionController = require("../controllers/sessionController.js");
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');


// Authentication routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

router.post("/events", eventController.createEvent);
router.get("/events", eventController.getAllEvents);
router.put("/events/", eventController.updateEvent);
router.delete("/events/", eventController.deleteEvent);
router.get("/events/weather", eventController.getWeatherForEvent);

// Session routes
router.get("/sessions", sessionController.getUserSessions);
router.post("/sessions/end", sessionController.endSession);



module.exports = router;