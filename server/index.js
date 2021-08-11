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


app.post("/api/loginUser", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username=? AND password=?",
        [username, password], 
        (err, results) => {
            const result = JSON.stringify(results);
            const json =  JSON.parse(result);
            console.log(json[0].surname);
            res.send({
                username: json[0].username,
                name: json[0].name,
                surname: json[0].surname,
                email: json[0].email,
            });
    })
})

app.post("/api/createUser", (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;
    const email = "test@test.des";

    const sqlInsert = "INSERT INTO users (username, name, surname, email, password) VALUES (?, ?, ?, ?, ?)"
    db.query(sqlInsert, [username, "Marvin", "Volkmann", email, password], (err, result) => {
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