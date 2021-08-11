// import { appServer, database } from '../index';
// const bcrypt = require('bcrypt');

// const SALT_ROUNDS = 10;

// // User login
// appServer.post("/api/loginUser", (req, res) => {
//     const username = req.headers.username || req.body.username;
//     const password = req.body.password;
//     const rememberMe = req.body.rememberMe;
//     const token = req.headers.rememberMeToken;

//     database.query(
//         "SELECT * FROM users WHERE username=?",
//         [username], 
//         (err, results) => {
//             if (err) {
//                 console.log(err);
//                 res.status(400).send({
//                     error: 'There was an error processing your request. '
//                 })
//             }

//             const result = JSON.stringify(results);
//             const json =  JSON.parse(result);
//             if (token) {
//                 if (Object.is(json[0].password, token)) {
//                     res.status(200).send({
//                         username: json[0].username,
//                         name: json[0].name,
//                         surname: json[0].surname,
//                         email: json[0].email
//                     })
//                 }
//             }

//             if(json.length > 0){
//                 bcrypt.compare(password, json[0].password).then((result) => {
//                     if(result){
//                         res.status(200).send({
//                             username: json[0].username,
//                             name: json[0].name,
//                             surname: json[0].surname,
//                             email: json[0].email,
//                             rememberMeToken: rememberMe ? 'aToken': ''
//                         });
//                     }
//                 });
//             }else{
//                 res.status(409).send({
//                     error: 'Password does not match'
//                 });
//             }
//     })
// })

// // Register User
// appServer.post("/api/registerUser", (req, res) => {
//     bcrypt.hash(req.body.password, SALT_ROUNDS, (err, hash) => {
//         if (err) {
//             res.status(400).send("Register unsuccessful");
//         }
//         const [username, name, surname, email] = req.body;
//         const password =  hash;
//         // const username = req.body.username;
//         // const email = "test@test.coms";
        
//         const sqlInsert = "INSERT INTO users (username, name, surname, email, password) VALUES (?, ?, ?, ?, ?)"
//         database.query(sqlInsert, [username, name, surname, email, password], (err, result) => {
//             if (err) {
//                 console.log(err)
//                 res.status(400).send("An Error occured while processing");
//             }
//             res.status(200).send({ username: username, name: name, surname: surname, email: email});
//         } )
//     });
// });

// //  Change Password
// appServer.post("/api/changePassword", (req, res) => {
//     const username = req.body.username; // evtl. sessionToken oder ähnliches verwenden
//     const oldPassword = req.body.oldPassword;
//     const newPassword = req.body.newPassword;

//     // Select the user
//     const  sqlSelect = "SELECT * FROM users WHERE users.username=?";
//     database.query(sqlSelect, [username], (err, results) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send({ message: "You must be logged in order to change your password"});
//         }
//         const result = JSON.stringify(results);
//         const json = JSON.parse(result);
//         // Check if given OldPassword is saved OldPassword
//         bcrypt.compare(oldPassword, json[0].password).then((err, result) => {
//             if (err) {
//                 console.log(err);
//                 res.status(400).send({ message: "Password could not be updated"});
//             }
//             // result is a boolean value
//             if (!result) {
//                 res.status(500).send({ message: "Password does not match"});
//             }
//             // At this point, the old Password matched, so the new one can be set
//             const sqlInsert = "UPDATE users SET users.password = (?) WHERE users.username = (?)";
//             database.query(sqlInsert, [newPassword, json[0].username], (err, result) => {
//                 if (err) {
//                     console.log(err);
//                     res.status(500).send({ message: "Error setting new Password", passwordUsed: newPassword});
//                 }
//                 if (result) {
//                     res.status(200).send({ message: "Password was updated"});
//                 }
//             })
//         }).catch(err => {
//             console.log(err);
//             res.status(400).send({ message: "Your old Password does not match."});
//         })
//     })
// })