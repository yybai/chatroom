const Chats = require('./models/chats');

function remove(array,element){
    return array.filter(e => e !== element);
};

var userList = []; // online username



module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('/* -------   connected in soket.js -------*/');
        
        socket.on('logged in',obj =>{
            if (userList.indexOf(obj.user) == -1 ){
              userList.push(obj.user);
            }
            io.emit('logged in info',obj);
            socket.user = obj.user;
        });

        // send online userlist to frontend
        socket.on('user list', obj => {
            io.emit('online user',userList);
        })

        // save chat message then send back to frontend
        socket.on('chat message', obj => {
            const chat = new Chats(obj);
            chat.save((err, doc) => {
                if(err){
                    io.emit('chat broadcast', { ...obj, message: err })
                } else {
                    io.emit('chat broadcast', obj)
                }
            }) 
        });


        // socket.on('notification',function(msg){
        //     console.log(msg);
        //     io.emit('notification',msg);
        // })


         socket.on('disconnect' , function() {
            
            console.log(userList.indexOf(socket.user));
            console.log('   user disconnected .................');
            console.log(socket.user + 'left');
            console.log('   before ' + userList);
            io.emit('logged out info',socket.user);

            userList = remove(userList,socket.user);
            console.log('   after ' + userList);

            io.emit('online user',userList);
         })
    });






}