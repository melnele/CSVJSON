var express = require("express"),
    helmet = require('helmet'),
    compression = require('compression'),
    bodyParser = require("body-parser"),
    app = express();

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}