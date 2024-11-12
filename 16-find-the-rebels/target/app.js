const PORT = 8080

const express = require("express");
const app = express();
const {execSync} = require('child_process')
const bodyParser = require("body-parser")
const fs = require('fs')

app.use(bodyParser.json())
app.set('trust proxy', true); // Or else the 'X-Forwarded-For' won't be in the headers by Express.

app.use('/images/', express.static(__dirname + '/static/images/'));


const forbiddenWords = [
    "whoami", "cat", "less", "more", "pwd", "echo", " ",
    "flag.txt", ";","tail", "busybox","ssh", "id", "env"
];

app.get("/", async (req, res) => {

    var html = fs.readFileSync(__dirname + '/static/sample.html').toString();

    console.log(req.headers);

    const targetHost = req.headers['x-original-forwarded-for'] ? req.headers['x-original-forwarded-for'] : req.headers['x-forwarded-for'] || req.ip;

    html = html.replace('{{IP}}', targetHost);
    html = html.replace('{{IP}}', targetHost);

    try {

        for (var word of forbiddenWords) {
            if (targetHost.includes(word)) {
                html = html.replace('{{OUTPUT}}', "Command injection detected! Blocked '" + word + "'!")
                res.send(html);
                return;
            }
        }

        let buffer = await execSync("ping -c 1 -W 0.2 -v -q -L -n " + targetHost).toString();
        html = html.replace('{{OUTPUT}}', buffer.toString())
    }
    catch (e) {
        console.error("Error occured!")
        console.error(e);
        console.error(e.output[1].toString());
        console.error(e.output[2].toString());
        html = html.replace('{{OUTPUT}}', 'Unable to reach target.')
    }

    res.send(html);
})

app.listen(PORT, (err) => {
    if (!err) {
        console.log("TraversingInternet server running on port " + PORT);
    }
    else {
        console.error("Failed to run the server!");
        console.error(err);
    }
})

process.on('SIGINT', () => process.exit());
