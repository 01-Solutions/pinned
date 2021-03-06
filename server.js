'use strict';
require('dotenv').config();
const express = require('express');
const https = require('https');
const cors = require('cors');
const agent = require('superagent');
const pgSQL = require('pg');
const server = express();
server.use(cors());
const client = new pgSQL.Client(process.env.DATABASE_URL)
    /////////////////////////////////////////////
const myHtml = express.static('./public/views/pages/index');
server.use(express.static('./public'));
server.set('view engine', 'ejs');
server.set("views", ["views/pages", "views/partials"])
server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));
const methodOverride = require('method-override');
const {
    query,
    json
} = require('express');
server.use(methodOverride('_method'));


const PORT = process.env.PORT || 3030;
/****************************************** */
const key = process.env.NEWSKEY;
const url = `https://newsapi.org/v2/everything?q=latest&apiKey=${key}`;
var user_id;
var user_email;
var longitud;
var latitud;
var weatherData;

server.get('/', indexPage);

server.get('/about', aboutus);

function aboutus(req, res) {
    res.render('aboutUs');
}
// if the user is a Signed up user then we will send hem to this rout
// server.get('/home', getHomeData);
/* this route for sine in and check if user have acount ao not on our database */
server.post('/signin', signinFun);
/* this route for sine in and check if user have acount ao not on our database */
server.post('/signup', signupFun);
/*this route for get search reslut */
server.post('/search', getSearchResult);
server.post('/getUserEmail', (req, res) => {
    user_email = req.body.email;
    longitud = req.body.longitud;
    latitud = req.body.latitud;
    getUserIdByEmail(user_email).then(result_id => {
        user_id = result_id;
    })
});
server.get('/logOut', (req, res) => {
        user_id = '';
        res.redirect('/')
    })
    /* this route for sinein data */
server.get('/signupdata', dataTOsignin);
/* this route for move ypo from article page to sign in&&sign up page */

server.get('/sign/signin-sigup', (req, res) => {
    res.render('signin-sigup')
});
server.post('/saveFavorate', saveFavFun);

server.get('/favList', getUserFavList)
    // server.post('/saveFavorate', saveFavFun);

function dataTOsignin(req, res) {
    var datasignin = req.body.msg;
    res.render('signin-sigup', { singinMsg: datasignin })
}

// this is a fuction to transfare array of objects to array
function arrToObj(arr, myProperty) {
    let result = arr.map(item => {
        return item[myProperty];
    });
    return result;
}

function indexPage(req, res) {
    if (user_email && user_id && user_id != '') {
        getWeatherData(longitud, latitud, '').then(() => {
            console.log('I am User');
            // res.redirect('/home');
            var sqlResult = [];
            let myURL;
            let sql = `select interests.interest_desc from interests,users_interests where interests.interest_id= users_interests.interest_id and users_interests.user_id = ${user_id};`;
            client.query(sql)
                .then(sqlData => { // get the SQL result
                    console.log('***********', sqlData.rows);
                    if (sqlData.rows.length < 1) {
                        // res.redirect('/')
                        myURL = `https://newsapi.org/v2/everything?q=TopNews&apiKey=${key}`;
                    } else {
                        sqlResult = arrToObj(sqlData.rows, 'interest_desc')
                        sqlResult = sqlResult.join(' OR ')
                        myURL = `https://newsapi.org/v2/everything?q=(${sqlResult})&apiKey=${key}`;
                    }
                    // let myURL = `https://newsapi.org/v2/everything?q=(${sqlResult})&apiKey=${key}`;
                    agent.get(myURL).then(apiResult => {
                        let result = JSON.parse(apiResult.text).articles.map(item => {
                            return new Article(item);
                        })
                        res.render('index', { allArticles: result, weather: weatherData });
                    });
                })
        })
    } else {
        getWeatherData('', '', 'Irbid').then(() => {
            console.log('I am Gust');
            agent.get(url).then(result => {
                let APIResult = JSON.parse(result.text).articles
                let myArticls = APIResult.map(item => {
                    return new Article(item);
                });
                // console.log(weatherData);
                res.render('index', { allArticles: myArticls, weather: weatherData });
            });
        })

    }
};

function dataTOsignin(req, res) {
    var datasignin = req.body.msg;
    res.render('signin-sigup', { singinMsg: datasignin })
}
/* get data from sign in form */
function signinFun(req, res) {
    var email = req.body.Email;
    var password = req.body.Password;
    let sql = `select * from users where user_email = '${email}';`;
    client.query(sql).then(dbResult => {
        if (dbResult.rows.length > 0) {
            if (dbResult.rows[0].user_pass == password) {
                user_id = dbResult.rows[0].user_id;
                res.redirect('/')
            } else {
                res.render('signin-sigup', { singinMsg: 'WrongPass' });
            }
        } else {
            res.render('signin-sigup', { singinMsg: 'notExist' });
        }
    })
}
/* get data from sign up form */
function signupFun(req, res) {
    let sql = `select * from users where user_email = '${req.body.Email}';`;
    client.query(sql).then(result => {
        if (result.rows.length > 0) {
            res.render('signin-sigup', { singinMsg: 'defulte' })
        } else {
            let {
                userName,
                email,
                password,
                gender
            } = req.body;
            let sqlQuery = `insert into users(user_name,user_email,user_pass,user_gender) values($1,$2,$3,$4);`;
            let safeValues = [req.body.UserName, req.body.Email, req.body.Password, req.body.gender];
            client.query(sqlQuery, safeValues).then(() => {
                res.redirect('/')
            });
        }
    })
}

function getSearchResult(req, res) {
    var searchData = req.body.search;
    var searchStr = searchData.split(' ').join(' OR ');
    var userID;
    let interstId;
    let intrestarr = [];
    let finalArray = [];
    if (!user_email) {
        let myURL = `https://newsapi.org/v2/everything?q=(${searchStr})&apiKey=${key}`;
        agent.get(myURL)
            .then(apiData => {
                let resultarr = JSON.parse(apiData.text).articles.map(item => {
                        return new Article(item);
                    })
                    // console.log('--------------------------------secound');
                finalArray = resultarr;
                // console.log('--------------------------------therids');
                res.render('articls', { articlsKey: finalArray });
            })
    } else {

        let sql = `select * from interests;`;
        client.query(sql)
            .then(dbintrest => {
                intrestarr = dbintrest.rows.map(item => {
                    return item['interest_desc'];
                });
                // console.log('--------------------------------first');
                // console.log('dfghjksd', intrestarr);
                userID = getUserIdByEmail(user_email)
                    .then((user_id) => {
                        // console.log('user id is here', user_id);
                        // console.log(searchData.split(' '));
                        searchData.split(' ').forEach(element => {
                            if (intrestarr.includes(element)) {
                                // console.log(element);
                                interstId = getinterestIdByEmail(element)
                                    .then((intrestId) => {
                                        checkIfexists(user_id, intrestId).then((result) => {
                                            if (!result) {
                                                // console.log('it is in database');
                                                let sql = `insert into users_interests (user_id,interest_id) VALUES($1,$2);`;
                                                let safeValues = [user_id, intrestId];
                                                return client.query(sql, safeValues)
                                            }
                                        })
                                    })
                            }
                        });


                    })
            })
            .then(() => {
                let myURL = `https://newsapi.org/v2/everything?q=(${searchStr})&apiKey=${key}`;
                agent.get(myURL)
                    .then(apiData => {
                        let resultarr = JSON.parse(apiData.text).articles.map(item => {
                                return new Article(item);
                            })
                            // console.log('--------------------------------secound');
                        finalArray = resultarr;
                        // console.log('--------------------------------therids');
                        res.render('articls', { articlsKey: finalArray });
                    })
            })

    }

}

function getUserIdByEmail(str) {
    let sql = `select user_id from users where user_email='${str}';`
    return client.query(sql).then(userId => {
        // console.log('momomomomomo', userId.rows[0].user_id);
        if (userId.rows.length > 0) {
            return userId.rows[0].user_id;
        }
    })
}

function getinterestIdByEmail(str) {
    let sql = `select interest_id from interests where interest_desc='${str}';`
    return client.query(sql).then(interestid => {
        if (interestid.rows.length > 0) {
            // console.log('eeeeeeeee', interestid.rows[0].interest_id);
            return interestid.rows[0].interest_id;
        }
    })
}

function checkIfexists(userid, intrestid) {
    // console.log('fffaaa', userid);
    // console.log('rrrrrrrrrrrrrrrrrrrrrr', intrestid);
    let sql = `select * from users_interests where interest_id=${intrestid} and user_id=${userid};`
    return client.query(sql).then(userId => {
        if (userId.rows.length > 0) {
            return true;
        } else {
            return false;
        }
    })
}

function saveFavFun(req, res) {
    // console.log('hiiii', user_id);
    if (user_id) {
        client.query(`select * from articles where title = '${req.body.articlTitle}';`).then(dbResult => {
            if (dbResult.rows.length <= 0) {

                let SQL = ' INSERT INTO articles(title,author,img,src_url,source,articl_date,conten) VALUES($1,$2,$3,$4,$5,$6,$7);';
                let safeValues = [req.body.articlTitle, req.body.articlAuthor, req.body.articlIMG, req.body.articlURL, req.body.articlSource, req.body.articlDate, req.body.articlDes];
                client.query(SQL, safeValues)
                    .then(() => {
                        // console.log('saved', safeValues);
                        let q = `INSERT INTO users_articles(user_id,article_id) VALUES($1,(select max(article_id) FROM articles));`;
                        let safeVal = [user_id];
                        // console.log('this is user id');
                        client.query(q, safeVal)
                    })
            } else {
                client.query(`select * from users_articles where user_id = ${user_id} and article_id = ${dbResult.rows[0].article_id};`)
                    .then(artResult => {
                        if (artResult.rows.length <= 0) {
                            let q = `INSERT INTO users_articles(user_id,article_id) VALUES($1,(select max(article_id) FROM articles));`;
                            let safeVal = [user_id];
                            // console.log('this is user id');
                            client.query(q, safeVal)
                        }
                    })
            }
        })
    } else {
        res.redirect('/signupdata')
    }
}

function getUserFavList(req, res) {
    let sql = `select * from articles,users_articles where articles.article_id = users_articles.article_id and users_articles.user_id = ${user_id};`;
    client.query(sql).then(result => {
        res.render('list', { userFavList: result.rows })

        // res.send(result.rows)
    })
}


function getWeatherData(lang, lat, locationCity) {
    // console.log(lang,lat,locationCity);
    let URL;
    let weatherKey = process.env.WEATHER_KEY;
    if (locationCity != '') {
        // console.log('city');
        URL = `https://api.weatherbit.io/v2.0/current?city=${locationCity}&key=${weatherKey}`;
    } else if (lang != '' && lat != '' && lat && lang) {
        // console.log('location');
        URL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lang}&key=${weatherKey}`;
    } else {
        // console.log('else');
        URL = `https://api.weatherbit.io/v2.0/current?city=Irbid&key=${weatherKey}`;
    }
    return agent.get(URL)
        .then(result => {
            let weatherResult = result.body.data.map((item, idx) => {
                let weatherOBJ = new Weather(item);
                return weatherOBJ;
            })
            weatherData = weatherResult[0];

        })
}

function Weather(data) {
    this.location = data.city_name;
    this.temp = data.temp;
    this.description = data.weather.description;
    this.wind_spd = data.wind_spd;
}


function Article(articleData) {
    this.title = articleData.title;
    this.author = articleData.author;
    this.img = articleData.urlToImage;
    this.url = articleData.url;
    this.source = (articleData.source.name) ? articleData.source.name : 'Ahmad Shela';
    this.description = articleData.description;
    this.date = new Date(articleData.publishedAt).toDateString();
}
client.connect().then(() => {
    server.listen(PORT, () => {
        console.log('I am linstining on port : ', PORT);
    });
});