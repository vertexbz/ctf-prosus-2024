const crypto = require('crypto');
require('dotenv').config()

const express = require('express');
const path = require('path');
const addField = require('object-assign');

const app = express();
const PORT = 80;

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'static')))

const users = {
    admin: {role: 'user', username: 'admin', password: crypto.randomBytes(10).toString() }
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.get('/font_bsod.ttf', (req, res) => {
    res.sendFile(path.join(__dirname, 'font_bsod.ttf'))
})

app.post('/', (req, res) => {
    console.log(req.body)
    let invalid = false;

    if (!users[req.body.username] || req.body.password !== users[req.body.username]['password']) {
        invalid = true;
    }

    const login = req.body.role === undefined ? req.body : addField({'role':'user'}, req.body);
    if (users[login.username]['role'] != login.role) {
        invalid = true;
    }

    if (!invalid && login.username && login.password) {
        res.send("Login succesful: " + process.env.FLAG);
    } else {
        res.send("Invalid credentials!");
    }
});

app.listen(PORT, () => {
    console.log("Server running...")
})

process.on('SIGINT', () => process.exit());
