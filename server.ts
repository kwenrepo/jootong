const { parse } = require("url");
const express = require("express");
const http = require("http");
const https = require("https");
const fs = require("fs");
const next = require("next");
const PORT = process.env.PORT || 3001;
const dev = process.env.NODE_ENV === "development";
const app = next({ dev });
const handle = app.getRequestHandler();
const httpsOptions = {
  key: fs.readFileSync("./jootong_com.key"),
  cert: fs.readFileSync("./jootong_com.pem")
};
const requestIp = require("request-ip");
const UAParser = require("ua-parser-js");

if(dev) process.env.NEXTAUTH_URL = "http://localhost:3000";

app
  .prepare()
  .then(() => {
    console.log(`========================================== APP Prepare Done ${process.env.NODE_ENV} ==========================================================`);
    
    const server = express();
    server.use(requestIp.mw());
    server.use("/public", express.static(__dirname + "/public"))

    http.createServer(server).listen(3000, () => {
      console.log('server is runing at port 3000')
      if(process.send) {
        process.send('ready');
        console.log("ready signal dev")
      }
    });
    
    https.createServer(httpsOptions, server).listen(PORT, () => {
      console.log('server is runing at port ' + PORT);
      if(process.send) {
        process.send('ready');
        console.log("ready signal production")
      }
    });
 
    server.use(function(req, res, next) {
      // console.log('=== userInfo : ', UAParser(req.headers["user-agent"]).device, UAParser(req.headers["user-agent"]).os, req.clientIp, new Date().toLocaleString() )

      if(!dev && (!req.secure || !req.headers?.host?.includes("www"))){
        res.redirect('https://www.jootong.com');
      } else {
        next();
      }   
    })

    server.use(async (req, res, next) => {
      try {

        const parsedUrl = parse(req.url, true);
        const { pathname, query } = parsedUrl;

        await handle(req, res, parsedUrl);

      } catch (err) {
        console.error("Error occurred handling", req.url, err);
        res.statusCode = 500;
        res.end("internal server error");
      }
    });
  })
  .catch((ex) => {
    console.log(ex.stack);
    process.exit(1);
  });