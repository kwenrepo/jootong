const { parse } = require("url");
const express = require("express");
const http = require("http");
const https = require("https");
const fs = require("fs");
const next = require("next");
const PORT = process.env.PORT;
const dev = process.env.NODE_ENV === "development";
const app = next({ dev });
const handle = app.getRequestHandler();
const httpsOptions = {
  key: fs.readFileSync("./privkey.pem"),
  cert: fs.readFileSync("./fullchain.pem"),
};
const requestIp = require("request-ip");
if(dev) process.env.NEXTAUTH_URL = "http://localhost:3000";

app
  .prepare()
  .then(() => {
    console.log(`========================================== APP Prepare Done ${process.env.NODE_ENV} ==========================================================`);
    let isAppGoingToBeClosed = false // HTTP 연결을 종료시킬 미들웨어에서 사용할 변수
    
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
    
    https.createServer(httpsOptions, server).listen(3001, () => {
      console.log('server is runing at port ' + 3001);
      if(process.send) {
        process.send('ready');
        console.log("ready signal production")
      }
    });
    
    server.use(function(req, res, next) {

      // 프로세스 종료 예정이라면 연결을 종료한다
      if (isAppGoingToBeClosed) {
        res.set('Connection', 'close')
      }else if(!dev && (!req.secure || !req.headers?.host?.includes("www"))){
        res.redirect('https://www.jootong.com')
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

    process.on('SIGINT', function() { // SIGINT 신호가 수신되었을 때
      isAppGoingToBeClosed = true

      // pm2 재시작 신호가 들어오면 서버를 종료시킨다.
      // listeningServer: server.listen 메소드가 리턴하는 서버 인스턴스를 할당한 변수
      listeningServer.close(function(err) {
        console.log('server closed')
        process.exit(err ? 1 : 0)
      })
    })
  })
  .catch((ex) => {
    console.log(ex.stack);
    process.exit(1);
  });