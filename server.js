var express = require("express");
var bodyParser = require("body-parser");

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
    var array = typeof req.body != 'object' ? JSON.parse(req.body) : req.body;
    var str = '';
    var max = 0;
    var largest = 0;

    for (var i = 0; i < array.length; i++) {
        if (Object.keys(array[i]).length > max) {
            max = Object.keys(array[i]).length;
            largest = i;
        }
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','
            line += array[i][index];
        }

        str += line + '\r\n';
    }
    var line = '';
    for (var index in array[largest]) {
        if (line != '') line += ','
        line += index;
    }
    str = line + '\r\n' + str;

    res.status(200).json({
        err: null,
        msg: 'OK',
        data: str
    });
});