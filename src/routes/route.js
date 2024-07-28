const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController.js");
const sessionController = require("../controllers/sessionController.js");

router.post("/events", eventController.createEvent);
router.get("/events", eventController.getAllEvents);
router.put("/events/:id", eventController.updateEvent);
router.delete("/events/:id", eventController.deleteEvent);
router.get("/events/:id/weather", eventController.getWeatherForEvent);

// Session routes
router.get("/sessions", sessionController.getUserSessions);
router.post("/sessions/:sessionId/end", sessionController.endSession);
