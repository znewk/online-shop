let pg = require("pg")
 
const Pool = pg.Pool
const pool = new Pool({
    user: 'cjzzbfxyksjfrh',
    host: 'ec2-54-228-99-58.eu-west-1.compute.amazonaws.com',
    database: 'dcgtdcvilpkgb4',
    password: '0afc0f5899db1ce3f338193b9a1d920ad9767573e6a47e61e861942d681e4248',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    },
})

exports.getTours = function(request, response){
    pool.query("select * from tours", function(error, response){
        if(error){
            console.log(error);
        }
        response.render("tours.hbs", {
            toursArray: results.rows
        });
    });
}
exports.aboutTour = function(request, response){
    let tourId = request.body.tourId;
    pool.query("select * from tours where id = $1",[tourId], function(error, response){
        if(error){
            console.log(error);
        }
        response.render("aboutTour.hbs", {
            toursArray: results.rows[0]
        });
    });
}