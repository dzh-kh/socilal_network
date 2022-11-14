const messageHandlers = require("./handlers/messageHandlers");
const { ChatRoomModel } = require("../models");
const { Op } = require("sequelize");

const users = new Map();

module.exports = async function onConnection(io, socket) {
  let { to, from } = socket.handshake.query;

  socket.on("user:add", () => users.set(from, socket.id));

  let room = await ChatRoomModel.findOne({
    where: { members: { [Op.contains]: [from, to] } },
  });

  socket.room = room?.id;
  socket.join(room?.id);

  let sockets = await io.in(room?.id).allSockets();

  const isAddresseeInRoom =
    [...sockets].filter((socket) => users.get(to) === socket).length > 0
      ? true
      : false;
  socket.emit("adressee:in_room", isAddresseeInRoom);

  messageHandlers(io, socket);
};
