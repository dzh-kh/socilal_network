module.exports = function messageHandlers(io, socket) {
  const updateMessageList = (msg) => {
    io.to(socket.room).emit("message_list:update", msg);
  };

  socket.on("message:get", async (msg) => {
    updateMessageList(msg);
  });

  socket.on("message:add", async (message) => {
    updateMessageList(message);
  });
};
