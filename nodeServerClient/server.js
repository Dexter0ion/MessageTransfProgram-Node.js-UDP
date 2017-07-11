//服务器及页面响应部分
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server); //引入socket.io模块并绑定到服务器
app.use('/', express.static(__dirname + '/page'));
server.listen(8080);

//socket部分
io.on('connection', function(socket) {
    //接收并处理客户端发送的foo事件
    socket.on('foo', function(data) {
        //将消息输出到控制台
        udpClientSend(data);
        console.log(data);
    })
});

function clientSyncMsg(msg) {

    //发送一个名为foo的事件，并且传递一个字符串数据‘hello’
    //接收并处理客户端发送的foo事件
        io.emit('foosync', msg);


    console.log(msg);
    console.log("Server已经同步");
};
//socket远程部分

//udp部分
udpClientListen();
function udpClientSend(msg)
{
    
    var dgram = require("dgram");
    var socket = dgram.createSocket("udp4");
    socket.bind(function () {
        socket.setBroadcast(true);
    });
    var message = new Buffer(msg);
    socket.send(message, 0, message.length, 10001, '127.0.0.1', function (err, bytes) {
        
        socket.close();
    });
    console.log(msg+"发送成功");
}

function udpClientListen()
{
    var dgram = require("dgram");
    var server = dgram.createSocket("udp4");
    server.on("error", function (err) {
        console.log("server error:\n" + err.stack);
        server.close();
    });
    server.on("message", function (msg, rinfo) {
        console.log("server got: " + msg + " from " +
            rinfo.address + ":" + rinfo.port);
            clientSyncMsg(msg);
    });
    server.on("listening", function () {
        var address = server.address();
        console.log("server listening " +
            address.address + ":" + address.port);
    });
    server.bind(10000);
}