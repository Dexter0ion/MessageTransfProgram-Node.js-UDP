var btnConnectStart = document.getElementById("btnConnectStart");
var tbxChatMsg = document.getElementById("tbxChatMsg");
var chatBoardMsg = document.getElementById("chatBoard");

//socket接收部分

var socket = io.connect('http://localhost:8081');

btnConnectStart.onclick = function () {
    serverSendMsg();
}
pageSocketListen();
function pageSocketListen()
{
socket.on('foosync', function (data) {
    //将消息输出到控制
    var msg = ab2str(data);
    chatBoardMsg.innerHTML += "Client:" + msg + "</br>";
})
}

var decoder = new TextDecoder("utf-8");

function ab2str(buf) {
    return decoder.decode(new Uint8Array(buf));
}
//前端向都唔起发送消息
function serverSendMsg() {
    var socket = io.connect();//与服务器进行连接
    var msg = tbxChatMsg.value;
    socket.emit('foo', msg);
    chatBoardMsg.innerHTML += "Server:" + msg + "</br>";
    //发送一个名为foo的事件，并且传递一个字符串数据‘hello’
}


