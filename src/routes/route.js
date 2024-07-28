const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController.js");
const sessionController = require("../controllers/sessionController.js");
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');


// Authentication routes
app.post('/register', authController.registerUser);
app.post('/login', authController.loginUser);

router.post("/events", authenticate,eventController.createEvent);
router.get("/events", authenticate,eventController.getAllEvents);
router.put("/events/:id", authenticate,eventController.updateEvent);
router.delete("/events/:id", authenticate,eventController.deleteEvent);
router.get("/events/:id/weather", authenticate,eventController.getWeatherForEvent);

// Session routes
router.get("/sessions", authenticate,sessionController.getUserSessions);
router.post("/sessions/:sessionId/end", authenticate,sessionController.endSession);
