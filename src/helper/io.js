const { Server } = require("socket.io");

module.exports = (server) => {

  const io = new Server(server);
  
  //Productos
  io.on('connection', socket => {
    socket.on('change', () => {
      io.sockets.emit('products')
    })
    socket.on('update', data => {
      io.sockets.emit('productUpdated', data)
    })
  });


  //Chat usuarios
  io.on('connection', socket => {
    socket.on('message', data => {
      io.sockets.emit('msg', data);
    });
  })
  
}
