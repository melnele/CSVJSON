var express = require("express");
var bodyParser = require("body-parser");
const Json2csvParser = require('json2csv').Parser;

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}

app.post("/api/jsontocsv", function (req, res) {
    try {
        const parser = new Json2csvParser({ "flatten": true });
        const csv = parser.parse(req.body);
        res.status(200).json({
            err: null,
            msg: 'OK',
            data: csv
        });
    } catch (err) {
        console.error(err);
    }
});