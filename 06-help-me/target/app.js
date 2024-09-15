/**
 * Project name:     TamaCore
 */

const PORT = 8080;

const fs = require("fs");
const express = require("express")
const app = express();
const secret = "[[DELETED! Leaked in previous commit]]";

app.use("/img/", express.static('./img'))

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/public/index.html");
})

app.get("/view", (req, res) => {

    const page = req.query.page;
    const filePath = __dirname + "/public/" + page;

    fs.stat(filePath, (err, stats) => {

        if (err || !stats.isFile()) {
            res.send("<pre>TamagotchiNotFoundException: Something went wrong!\n" +
                "   at locationTamagotchi (../package.json:9:11)\n" +
                "   at ../app.js:13:5\n</pre>");
            return;
        }

        try {

            res.send(fs.readFileSync(filePath).toString());
        }
        catch (err) {
            console.log("Causing IP: " + req.ip)
            console.log(err);
            res.send("<pre>TamagotchiNotFoundException: Something went wrong!\n" +
                "   at locationTamagotchi (../package.json:9:11)\n" +
                "   at ../app.js:13:5\n</pre>");
        }
    })
})

app.use("*", (req, res) => {
    res.send("Unknown page")
})

app.listen(PORT, (err) => {
    if (!err) {
        console.log("Server running on port " + PORT)
    } else {
        console.log("Failed to run server!")
        console.error(err);
    }
})

process.on('SIGINT', () => process.exit());
