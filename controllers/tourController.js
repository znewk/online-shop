const tour = require("../models/tour");
let db = require("../helpers/db");

exports.getTours = function(request, response) {
    db.getTours(request, response);
}
exports.aboutTour = function(request, response) {
    db.aboutTour(request, response);
}