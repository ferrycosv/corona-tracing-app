// this is the main entry point for your full app
// it serves your frontend & provides access to your API
/*
IMPORTANT!!!

YOU MUST SET THIS FLAG TO ENABLE FOR CHROME TO ALLOW HTTPS REQUEST TO API DURING DEVELOPMENT
chrome://flags/#allow-insecure-localhost
*/
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const config = require("./config");
const api = require("./api/");
var fs = require("fs");
var https = require("https");

const app = express();
//app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.method + ": " + req.path);
  next();
});

app.use("/", express.static(__dirname + config.SRC));
app.get("/", (req, res) => {
  res.sendFile(__dirname + `${config.SRC}index.html`);
});

app.use("/api", api);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).end();
});

https
  .createServer(
    {
      key: fs.readFileSync("./server.key"),
      cert: fs.readFileSync("./server.cert"),
    },
    app
  )
  .listen(config.PORT, () =>
    console.log(
      `listening at https://localhost:${config.PORT} (${config.MODE} mode)`
    )
  );
