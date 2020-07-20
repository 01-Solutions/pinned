'use strict';
require('dotenv').config();
const express = require('express');
const https = require('https');
const cors = require('cors');
const agent = require('superagent');
const pgSQL = require('pg');
// var cheerio = require('cheerio'),
// $ = cheerio.load('pages/index.ejs');
const server = express();
const client = new pgSQL.Client(process.env.DATABASE_URL)
server.use(cors());
/////////////////////////////////////////////
const myHtml = express.static('./public/views/pages/index');
server.use(express.static('./public'));
server.set('view engine', 'ejs');
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const methodOverride = require('method-override');
server.use(methodOverride('_method'));
/////////////////////////////////////////////
const PORT = process.env.PORT || 3030;
/****************************************** */
const key = process.env.NEWSKEY;
const url = `https://newsapi.org/v2/everything?q=latest&apiKey=${key}`;
var user_id;
let mytestString = 'sport cars sex food ';
// if the user is a 'gust' then we will send hem to this route
server.get('/', test);
server.get('/list',(req,res)=>{
    res.render('./pages/signin-sigup')
})
// if the user is a Signed up user then we will send hem to this rout
server.get('/', home);
server.get('/art', test)
    // server.get('/about', aboutus);
    // function aboutus(req, res) {
    //     res.render('pages/aboutUs');
    // }
    // if the user is a Signed up user then we will send hem to this rout
server.get('/home', getHomeData);
/* this route for sine in and check if user have acount ao not on our database */
server.post('/signin', signinFun);
/* this route for sine in and check if user have acount ao not on our database */
server.post('/signup', signupFun);
/* this route for sinein data */
server.post('/signupdata', dataTOsignin);

function dataTOsignin(req, res) {
    var datasignin = req.body.msg;
    console.log(datasignin);
    res.render('pages/signin-sigup', { singinMsg: datasignin })
        // check the data withe data base ;
}
server.post('/interest', datainterest);
var arrinterest = [];

function datainterest(req, res) {
    var ddd = req.body.msg1
    console.log(ddd);
    // check the data withe data base ;
}
/* this route for move ypo from article page to sign in&&sign up page */
server.get('/sign/signin-sigup', (req, res) => {
    res.render('./pages/signin-sigup')
});
server.get('/search', getSearchResult);

function getSearchResult(req, res) {
    // let sqlResult = req.body.searchString;
    let sqlResult = strToArr(mytestString);
    sqlResult = sqlResult.join(' OR ')
    let myURL = `https://newsapi.org/v2/everything?q=(${sqlResult})&apiKey=${key}`;
    agent.get(myURL).then(apiResult => {
        let result = JSON.parse(apiResult.text).articles.map(item => {
            return new Article(item);
        })
        res.render('pages/index', { allArticles: result });
    });
}

function getHomeData(req, res) {
    var sqlResult = [];
    let sql = `select interests.interest_desc from interests,users_interests where interests.interest_id = users_interests.interest_id and users_interests.user_id = ${user_id};`;
    client.query(sql)
        .then(sqlData => { // get the SQL result
            if (sqlData.rows.length < 1) {
                res.redirect('/')
            }
            sqlResult = arrToObj(sqlData.rows, 'interest_desc')
            sqlResult = sqlResult.join(' OR ')
            let myURL = `https://newsapi.org/v2/everything?q=(${sqlResult})&apiKey=${key}`;
            agent.get(myURL).then(apiResult => {
                let result = JSON.parse(apiResult.text).articles.map(item => {
                    return new Article(item);
                })
                res.render('pages/index', { allArticles: result });
            });
        })
}
// this is a fuction to transfare array of objects to array
function arrToObj(arr, myProperty) {
    let result = arr.map(item => {
        return item[myProperty];
    });
    return result;
}

function strToArr(str) {
    return str.split(' ');
}

function test(req, res) {
    agent.get(url).then(result => {
        let APIResult = JSON.parse(result.text).articles
        let myArticls = APIResult.map(item => {
            return new Article(item);
        });
        res.render('pages/articls', { articlsKey: myArticls });
    });
};

function home(req, res) {
    agent.get(url).then(result => {
        let APIResult = JSON.parse(result.text).articles
        let myArticls = APIResult.map(item => {
            return new Article(item);
        });
        res.render('pages/index', { allArticles: myArticls });
    });
};

function dataTOsignin(req, res) {
    var datasignin = req.body.msg;
    console.log(datasignin);
    res.render('pages/signin-sigup', { singinMsg: datasignin })
}
/* get data from sign in form */
function signinFun(req, res) {
    var email = req.body.Email;
    var password = req.body.Password;
    console.log(email);
    console.log(password);
    let sql = `select * from users where user_email = '${email}';`;
    console.log(sql);
    client.query(sql).then(dbResult => {
        if (dbResult.rows.length > 0) {
            if (dbResult.rows[0].user_pass == password) {
                user_id = dbResult.rows[0].user_id;
                res.redirect('/home')
            } else {
                res.render('pages/signin-sigup', { singinMsg: 'WrongPass' });
            }
        } else {
            res.render('pages/signin-sigup', { singinMsg: 'notExist' });
        }
    });
}
/* get data from sign up form */
function signupFun(req, res) {
    let sql = `select * from users where user_email = '${req.body.Email}';`;
    client.query(sql).then(result => {
            if (result.rows.length > 0) {
                res.render('pages/signin-sigup', { singinMsg: 'defulte' })
            } else {
                let { userName, email, password, gender } = req.body;
                let sqlQuery = `insert into users(user_name,user_email,user_pass,user_gender) values($1,$2,$3,$4);`;
                let safeValues = [req.body.UserName, req.body.Email, req.body.Password, req.body.gender];
                client.query(sqlQuery, safeValues).then(() => {
                    res.redirect('/')
                });
            }
        })
        // check the data withe data base ;
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