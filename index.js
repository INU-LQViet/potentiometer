const path = require("path");
const fs   = require('fs');
const {SerialPort} = require('serialport');
const COMport = new SerialPort({ path: 'COM7', baudRate: 9600 });
const { ReadlineParser } = require('@serialport/parser-readline');
const parser = COMport.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// express app
const express = require('express');
const app = express();
const WEBport = 3000;

const option = {
    extensions: ['htm', 'html'],
    index: false, // for doesn't automatic open the html file
};

app.use(express.static(path.join(__dirname, 'public'), option));

// IO server
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);

// app.get('', (req, res)=>{
//     const homelink = path.join(__dirname+'/public/index.html');
//     res.sendFile(homelink);
// });

io.on("connect", (socket)=>{
    console.log("A client connect to server!");
    // socket.on("sensor",(data)=>{
    //     let goals = data.goals;
    //     console.log(goals);
    //     COMport.write(`[${goals[0]},${goals[1]}]\n`,function(err, res) {
    //         if (err) return console.log(err);
    //     });
    // });
});

io.on("disconnect", ()=>{
    console.log("The client has disconnected to server!");
});

parser.on('data', (data)=>{
    console.log(data);
    // let sendArray = [];
    if(data.charAt(0)=="[" && data.charAt(data.length-1)=="]"){
        // let tempStrings = data.substring(1,data.length-1);
        // let arrayStrings = tempStrings.split(',');
        // arrayStrings.forEach(string => {
        //     sendArray.push(parseInt(string, 10));
        // });
        io.emit('status', {angle:data});
    };
});



server.listen(WEBport, () => {
    console.log(`Example app listening on port ${WEBport}`);
});