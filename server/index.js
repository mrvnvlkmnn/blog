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
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username=?",
        [username], 
        (err, results) => {
            const result = JSON.stringify(results);
            const json =  JSON.parse(result);

            if(json.length > 0){
                bcrypt.compare(password, json[0].password).then((result) => {
                    if(result){
                        res.send({
                            username: json[0].username,
                            name: json[0].name,
                            surname: json[0].surname,
                            email: json[0].email,
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

app.post("/api/loginUser", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const rememberMe = req.body.rememberMe;
    const token = req.headers.rememberMeToken;

    const sqlSelect = "SELECT * FROM users WHERE username=?";
    db.query(sqlSelect, [username], (err, result, fields) => {
        if (err) {
            console.log(err);
            res.status(400).send("Login unsuccessful");
        }
        if (result.password && password) { // hash password
            if (token) {
                // verify Token
            }
            if (rememberMe) {
                res.status(200).send({ rememberMeToken: "aToken"});
            }
            res.status(200).send();
        }
    })
})


app.listen(3001, () => {
    console.log("running on port 3001");
});