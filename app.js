var express = require('express');
var socket = require('socket.io');
const { render } = require('ejs');

var app = express();

app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;
 var server = app.listen(port, function(){
	console.log(`Listening to port ${port}`);
})
app.use(express.static('public'));

//socket setup

var io = socket(server);

io.on('connection', socket =>{
	console.log('Made connection',socket.id);

	socket.on('chat',(data)=>{
	io.sockets.emit('chat',data);
	})
	socket.on('typing',data=>{
		socket.broadcast.emit('typing',data);
	})
	socket.on('play',data=>{
		socket.broadcast.emit('play',data);
	})
	socket.on('time',data=>{
		socket.broadcast.emit('time',data);
		console.log(data);
	})
})
app.get('/',(req,res)=>{
	render('index');
})