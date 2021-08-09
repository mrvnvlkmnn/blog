const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog' ,
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/getUsers", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if(err) {
            console.log(err)
        }
    res.send(result);
    })
})


app.post("/api/insert", (req, res) => {
    
    const userName = req.body.userName;
    const password = req.body.password;
    const email = "test@test.de";

    const sqlInsert = "INSERT INTO users (username, title, name) VALUES (?, ?, ?)"
    mysql.query(sqlInsert, [userName, password, email], (err, result) => {
        console.log(err)
    } )
});
app.get("/", (req, res) => {
    const sql = db.query("SELECT * FROM users", (err, result, fields) => {
        res.send(result)
    });
})
/*
app.post('/api/loginUser', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);

    const checkLogin = "SELECT username, password FROM users WHERE username LIKE ?";
    mysql.query(checkLogin, username, (err, result) => {
        console.log(result);
    })
})*/


app.listen(3001, () => {
    console.log("running on port 3001");
});