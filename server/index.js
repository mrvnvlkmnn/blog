const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt')

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
    const username = req.headers.username || req.body.username;
    const password = req.body.password;
    const rememberMe = req.body.rememberMe;
    const token = req.headers.rememberMeToken;

    db.query(
        "SELECT * FROM users WHERE username=?",
        [username], 
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(400).send({
                    error: 'There was an error processing your request. '
                })
            }

            const result = JSON.stringify(results);
            const json =  JSON.parse(result);
            if (token) {
                if (Object.is(json[0].password, token)) {
                    res.status(200).send({
                        username: json[0].username,
                        name: json[0].name,
                        surname: json[0].surname,
                        email: json[0].email
                    })
                }
            }

            if(json.length > 0){
                bcrypt.compare(password, json[0].password).then((result) => {
                    if(result){
                        res.status(200).send({
                            username: json[0].username,
                            name: json[0].name,
                            surname: json[0].surname,
                            email: json[0].email,
                            rememberMeToken: rememberMe ? 'aToken': ''
                        });
                    }
                });
            }else{
                res.status(409).send({
                    error: 'Password does not match'
                });
            }
    })
})

app.post("/api/createUser", (req, res) => {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        const password =  hash;
        const username = req.body.username;
        const email = "test@test.coms";
        
        const sqlInsert = "INSERT INTO users (username, name, surname, email, password) VALUES (?, ?, ?, ?, ?)"
        db.query(sqlInsert, [username, "Marvin", "Volkmann", email, password], (err, result) => {
            console.log(err)
        } )
    });
    
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