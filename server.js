var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

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
    var array = typeof req.body != 'object' ? JSON.parse(req.body) : req.body;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
});