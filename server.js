
'use strict';
require('dotenv').config();

const express = require('express');
// const cors = require('cors');
const agent = require('superagent');
// const pgSQL = require('pg');
const server = express();
// const client = new pgSQL.Client(process.env.DATABASE_URL)
// server.use(cors());
const PORT = process.env.PORT || 3030;
/****************************************** */
server.get('/',test);
function test(req,res) {
    let key = ``;
    let url = ``;
agent.get('').then(()=>{
    
})
}


server.listen(PORT,()=>{
    console.log('I am linstining on port : ',PORT);
})