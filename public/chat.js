//make connetion
var socket = io.connect('https://chatcure.herokuapp.com/');
// var socket = io.connect('localhost:3000');
    handle = document.getElementById('handle'),
    message = document.getElementById('message'),
    btn = document.getElementById('send'),
    feedback = document.getElementById('feedback'),
    play = document.getElementById('player'),
    plyps = document.getElementById('plyps'),
    output = document.getElementById('output');


btn.addEventListener('click',()=>{
    socket.emit('chat',{
        message:message.value,
        handle:handle.value
    });
    message.value='';
    message.focus();
    output.scrollTop = output.scrollHeight;
})
plyps.addEventListener('click',()=>{
    if(play.paused){
        play.play();
        plyps.innerText='Pause';
        socket.emit('play','true');
    }else{
        play.pause();
        plyps.innerText='Play';
        socket.emit('play','false');
    }
})

message.addEventListener('keypress',()=>{
    socket.emit('typing',handle.value);
})
socket.on('chat',data=>{
    feedback.innerHTML='';
    output.innerHTML+='<p><strong>'+data.handle+'</strong> '+data.message+'</p>';
    output.scrollTop = output.scrollHeight;
})
socket.on('play',data=>{
    if(data=='false'){
        play.pause();
        plyps.innerText='Play';
    }else{
        play.play();
        plyps.innerText='Pause';

    }
})
// socket.on('time',data=>{
//     play.currentTime=data;
//     time.stopPropagation();
// })
play.onseeked = ()=>{
    var tim = play.currentTime;
    socket.emit('time',tim);
}
socket.on('typing',data=>{
    feedback.innerHTML=`<p>${data} is typing.</p>`;
})

socket.on('connection',socket =>{
    console.log('Connected');
})