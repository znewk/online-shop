const express = require("express");
const tourController = require("../controllers/tourController");
const tourRouter = express.Router();

tourRouter.get("/", tourController.getTours);
tourRouter.post("/about", tourController.aboutTour);

module.exports = tourRouter;