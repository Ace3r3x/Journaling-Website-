const express = require(`express`);
const mysql = require ('mysql');
const dotenv = require ('dotenv');
dotenv.config({path: '/.env'})

const app = express();
const db = mysql.createConnection({
 host : process.env.DATABASE_HOST,
 user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE``
})
const port = 5000;
app.get ("/", (req, res) => {
    res.send ("<h2>This website is due in 2 days......</h2>")

});

app.listen (port, () => {
    console.log(`Server Started on port ${port}`);
})