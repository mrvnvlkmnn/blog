const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog' ,
});

app.use(cors);
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/insertPost", (req, res) => {
    const user_id = req.body.user_id;
    const title = req.body.title;
    const content = req.body.content;

    const sqlInsert = "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)"
    mysql.query(sqlInsert, [user_id, title, content], (err, result) => {
        console.log(err)
    } )
});


app.listen(3001, () => {
    console.log("running on port 3001");
});