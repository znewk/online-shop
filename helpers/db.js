let pg = require("pg")
const TelegramBot = require("node-telegram-bot-api");

const token = '1897548081:AAF2kHQiOXVhJqZk_LV9CjQbDEPokjVt0H8';
const bot = new TelegramBot(token, { polling: false });

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

exports.getTours = function(request, response) {
    pool.query("select * from tours", function(error, toursResult) {
        if (error) {
            console.log(error);
        }
        pool.query('SELECT hotels.id, hotels.name as "hotel_name", countries.id as "country_id", cities.id as "city_id", stars, description, countries.name as "country_name", cities.name as "city_name", tours.price as "price", tours.tours_count as "count", hotels.priview_img as "img" FROM public.hotels  join countries on countries.id = hotels.country_id join cities on cities.id = hotels.city_id join tours on hotels.id = tours.hotel_id order by tours.price', function(error, hotelsResult) {
            if (error) {
                console.log(error);
            }
            pool.query("select * from hotels_photos", function(error, hotelsPhotosResult) {
                if (error) {
                    console.log(error);
                }

                console.log("TOURS: " + toursResult.rows);
                console.log("HOTELS: " + hotelsResult.rows);
                console.log("HOTELS PHOTOS: " + hotelsPhotosResult.rows);

                response.render('tours.ejs', {
                    tours: toursResult.rows,
                    hotels: hotelsResult.rows,
                    hotelsPhotos: hotelsPhotosResult.rows
                })
            });
        });
    });
}
exports.aboutTour = function(request, response) {
    let tourId = request.body.tourId;
    pool.query("select * from tours where id = $1", [tourId], function(error, results) {
        if (error) {
            console.log(error);
        }
        if (results.rows[0].length != 0) {

        }
    });
}

exports.registerAdminTB = function(userName, chatID) {

    pool.query("select * from tg_admins where chat_id = $1", [chatID], function(error, results) {
        if (error) {
            console.log(error);
        }
        console.log('NEW MESSAGE')
        console.log("RESULTS: " + JSON.stringify(results.rows[0]))

        if (results.rows[0] === undefined) {
            pool.query("INSERT INTO tg_admins (user_name, chat_id) VALUES($1, $2)", [userName, chatID], function(error, results) {
                if (error) {
                    console.log(error);
                }
                console.log('TRUE')
                bot.sendMessage(chatID, 'Вы успешно зарегистрированы!')
            })
        } else {
            console.log('FALSE')
            bot.sendMessage(chatID, 'Пользователь уже был зарегистрирован!')

        }
    });


}