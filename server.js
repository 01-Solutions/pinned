'use strict';
require('dotenv').config();

const express = require('express');
const https = require('https');
const cors = require('cors');
const agent = require('superagent');
const pgSQL = require('pg');
const server = express();
const client = new pgSQL.Client(process.env.DATABASE_URL)
server.use(cors());

server.use(express.static('./public'));

server.set('view engine', 'ejs');

const PORT = process.env.PORT || 3030;

/****************************************** */
const key = process.env.NEWSKEY;
const url = `https://newsapi.org/v2/everything?q=topNews&apiKey=${key}`;
server.get('/', getPage);

function getPage(req, res) {
    res.render('pages/index');
}

// if the user is a 'gust' then we will send hem to this route
server.get('/test', test);

// if the user is a Signed up user then we will send hem to this rout
server.get('/home', getHomeData);


function getHomeData(req,res) {
    var sqlResult = [];
    var finalResult = [];
    let sql = `select interests.interest_desc from interests,users_interests where interests.interest_id = users_interests.interest_id and users_interests.user_id = 1;`;
    client.query(sql)
    .then(sqlData => { // get the SQL result
        sqlResult = arrToObj(sqlData.rows, 'interest_desc')
        console.log('********************************First');
    }).then(() => { // get the API result based on the SQL result
        sqlResult.forEach(item => {
            console.log(item);
            let myUrl = `https://newsapi.org/v2/everything?q=${item}&apiKey=${key}`;
            agent.get(myUrl)
            .then(apiResult => { // filtt the array of result
                if (JSON.parse(apiResult.text).articles.length >= 3) {
                    for (let i = 0; i < 3; i++) {
                        finalResult.push(new Article(JSON.parse(apiResult.text).articles[i]))
                    }
                }
                console.log('********************************secound');
            })
        })
        
    }).then(() => {
        // resoned the array of result
        // setTimeout(console.log('third'),3000);
        setTimeout(function () {
            console.log(finalResult.length);
            res.send(finalResult)
            console.log('********************************third');
        }, (700));
    })
}
function test(arr) {
    let arrResult = [];
    arr.forEach(item => {

        agent.get(myUrl).then(result => {
            for (let i = 0; i < 3; i++) {
                arrResult.push(result[i])
            }
        });
    });
    return arrResult
}

// function getHomeData(req, res) {
//     let sql = `select interests.interest_desc from interests,users_interests where interests.interest_id = users_interests.interest_id and users_interests.user_id = 1;`;
//     client.query(sql).then(sqlResult => { // res.send(arrToObj(sqlResult.rows,'interest_desc'))
//         result = arrToObj(sqlResult.rows, 'interest_desc');
//         result.forEach(item => {
//             let myUrl = `https://newsapi.org/v2/everything?q=${item}&apiKey=${key}`
//             agent.get(myUrl).then(data => {
//                 let APIResult = JSON.parse(data.text).articles
//                 for (let index = 0; index < 3; index++) {

//                         myArrticle.push(new Article(APIResult[index]));

//                 }
//             });
//         })
//     }).then(()=>{
//         res.status(200).send(myArrticle);

//     });
// }
// this is a fuction to transfare array of objects to array
function arrToObj(arr, myProperty) {
    let result = arr.map(item => {
        return item[myProperty];
    });
    return result;
}

function test(req, res) {
    agent.get(url).then(result => {
        let APIResult = JSON.parse(result.text).articles
        let myArticls = APIResult.map(item => {
            return new Article(item);

        });
        res.status(200).send(myArticls);
    });
};

function Article(articleData) {
    this.title = articleData.title;
    this.author = articleData.author;
    this.img = articleData.urlToImage;
    this.url = articleData.url;
    this.source = (articleData.source.name) ? articleData.source.name : 'Ahmad Shela';
    this.content = articleData.content;
}


client.connect().then(() => {
    server.listen(PORT, () => {
        console.log('I am linstining on port : ', PORT);
    });
});
