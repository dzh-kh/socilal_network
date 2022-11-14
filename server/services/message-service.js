const {
  MessageModel,
  ChatRoomModel,
  ProfileModel,
} = require("../models/index");
const { Op } = require("sequelize");

class MessageService {
  async addMessage(text, readStatus, from, to) {
    to = Number(to);

    let room = await ChatRoomModel.findOne({
      where: { members: { [Op.contains]: [from, to] } },
    });
    if (!room) {
      room = await ChatRoomModel.create({
        members: [from, to],
        user1Id: from,
        user2Id: to,
      });
    }

    await MessageModel.create(
      {
        text,
        readStatus,
        fromId: from,
        toId: to,
        chatId: room.id,
      },
      { include: [{ model: ProfileModel, as: "from" }] }
    );
    const msg = await MessageModel.findOne({
      where: {
        text,
        chatId: room.id,
      },
      include: [{ model: ProfileModel, as: "from" }],
    });
    return msg;
  }

  async getMessages(from, to) {
    to = Number(to);
    const messages = await MessageModel.findAll({
      where: {
        toId: { [Op.or]: [to, from] },
        fromId: { [Op.or]: [to, from] },
      },
      attributes: [
        "chatId",
        "fromId",
        "toId",
        "text",
        "id",
        "readStatus",
        "createdAt",
      ],
      include: [
        {
          model: ProfileModel,
          as: "from",
          attributes: ["id", "firstName", "lastName", "avatar"],
        },
      ],
    });
    return messages;
  }

  async addChatRoom(from, to) {
    to = Number(to);
    const room = await ChatRoomModel.findOne({
      where: { members: { [Op.contains]: [from, to] } },
    });
    const msg = await MessageModel.findOne({
      where: { from: { [Op.or]: [to, from] }, to: { [Op.or]: [to, from] } },
    });
    if (!room && msg) {
      await ChatRoomModel.create({
        members: [from, to],
        user1Id: from,
        user2Id: to,
      });
    }
  }

  async updateChatCheckedTime(from, to, date) {
    date = Number(date);
    to = Number(to);

    const room = await ChatRoomModel.findOne({
      where: { members: { [Op.contains]: [from, to] } },
      include: [
        {
          model: ProfileModel,
          as: "user1",
          attributes: ["id", "firstName", "lastName", "avatar"],
        },
        {
          model: ProfileModel,
          as: "user2",
          attributes: ["id", "firstName", "lastName", "avatar"],
        },
      ],
    });

    if (from === room.user1.id) {
      room.user1LastChecked = date;
      room.save();
    }
    if (from === room.user2.id) {
      room.user2LastChecked = date;
      room.save();
    }
    await MessageModel.update(
      { readStatus: true },
      { where: { readStatus: false, fromId: to, toId: from } }
    );
  }

  async getChatRooms(from) {
    let chats = await ChatRoomModel.findAll({
      where: {
        members: { [Op.contains]: [from] },
      },
      attributes: ["id"],
      include: [
        {
          model: ProfileModel,
          as: "user1",
          attributes: ["id", "firstName", "lastName", "avatar"],
        },
        {
          model: ProfileModel,
          as: "user2",
          attributes: ["id", "firstName", "lastName", "avatar"],
        },
      ],
    });

    const messages = await MessageModel.findAll({
      where: { toId: from, readStatus: false },
      attributes: ["chatId"],
    });

    return Object.values(chats).map((i) => {
      if (i.user1.id === from) {
        let user = i.user2;
        return {
          user,
          unreadMessagesCount: messages.filter((msg) => msg.chatId === i.id)
            .length,
        };
      } else {
        let user = i.user1;
        return {
          user,
          unreadMessagesCount: messages.filter((msg) => msg.chatId === i.id)
            .length,
        };
      }
    });
  }
}

module.exports = new MessageService();
