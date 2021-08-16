const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog' ,
});

const app = express();

app.use(cors());
app.use(express.json());

// Wie kann ich AXIOS in anderen Dateien benutzen?
// export const appServer = app;
// export const database = db;

app.get("/api/getUsers", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if(err) {
            console.log(err)
        }
    res.send(result);
    })
})

const SALT_ROUNDS = 10;

// Login User
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
                    console.log("Sending Response back to Frontend")
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
        }).catch(err => {
            console.log(err);
        })
    })

// Register User
app.post("/api/registerUser", (req, res) => {
    bcrypt.hash(req.body.password, SALT_ROUNDS, (err, hash) => {
        if (err) {
            res.status(400).send("Register unsuccessful");
        }
        const password =  hash;
        const username = req.body.username;
        const name = req.body.name;
        const surname = req.body.surname;
        const email = req.body.email;
        const rememberMe = req.body.rememberMe;
        // const email = "test@test.coms";
        
        const sqlInsert = "INSERT INTO users (username, name, surname, email, password) VALUES (?, ?, ?, ?, ?)"
        db.query(sqlInsert, [username, name, surname, email, password], (err, result) => {
            if (err) {
                console.log("Error: " + err)
                res.status(400).send({ message: "An Error occured while processing"});
            }
            res.status(200).send({ username: username, name: name, surname: surname, email: email});
        } )
    }).catch(err => {
        console.log(err);
    });
});

//  Change Password
app.post("/api/changePassword", (req, res) => {
    const username = req.body.username; // evtl. sessionToken oder ähnliches verwenden
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    // Select the user
    const  sqlSelect = "SELECT * FROM users WHERE users.username=?";
    db.query(sqlSelect, [username], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "You must be logged in order to change your password"});
        }
        const result = JSON.stringify(results);
        const json = JSON.parse(result);
        // Check if given OldPassword is saved OldPassword
        bcrypt.compare(oldPassword, json[0].password).then((err, result) => {
            if (err) {
                console.log(err);
                res.status(400).send({ message: "Password could not be updated"});
            }
            // result is a boolean value
            if (!result) {
                res.status(500).send({ message: "Password does not match"});
            }
            // At this point, the old Password matched, so the new one can be set
            const sqlInsert = "UPDATE users SET users.password = (?) WHERE users.username = (?)";
            db.query(sqlInsert, [newPassword, json[0].username], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ message: "Error setting new Password", passwordUsed: newPassword});
                }
                if (result) {
                    res.status(200).send({ message: "Password was updated"});
                }
            })
        }).catch(err => {
            console.log(err);
            res.status(400).send({ message: "Your old Password does not match."});
        })
    }).catch(err => {
        console.log(err);
    })
})

// app.post("/api/createUser", (req, res) => {
//     const saltRounds = 10;
//     bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
//         const password =  hash;
//         const username = req.body.username;
//         const email = "test@test.coms";
        
//         const sqlInsert = "INSERT INTO users (username, name, surname, email, password) VALUES (?, ?, ?, ?, ?)"
//         db.query(sqlInsert, [username, "Marvin", "Volkmann", email, password], (err, result) => {
//             console.log(err)
//         } )
//     });
    
// });

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