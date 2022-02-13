const { Server } = require("socket.io");

module.exports = (server) => {

  const io = new Server(server);
  
  //Productos
  io.on('connection', socket => {
    socket.on('change', data => {
      io.sockets.emit('products', data)
    })
    socket.on('update', data => {
      io.sockets.emit('productUpdated', data)
    })
    socket.on('display', data => { 
      io.sockets.emit('product', data);  
    });
  });


  //Chat usuarios
  io.on('connection', socket => {
    socket.on('message', data => {
      io.sockets.emit('msg', data);
    });
  })
  
}