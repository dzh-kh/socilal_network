const messageService = require("../services/message-service");

class MessageController {
  async addMessage(req, res, next) {
    try {
      const { text, readStatus } = req.body;

      const { id } = req.params;
      const userId = req.user.id;
      const message = await messageService.addMessage(
        text,
        readStatus,
        userId,
        id
      );
      res.status(201).json(message);
    } catch (e) {
      next(e);
    }
  }

  async getChatMessages(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const messages = await messageService.getMessages(userId, id);
      return res.status(200).json(messages);
    } catch (e) {
      next(e);
    }
  }

  async updateChatCheckedTime(req, res, next) {
    try {
      const { id } = req.params;
      const { date } = req.body;
      const userId = req.user.id;
      const chat = await messageService.updateChatCheckedTime(userId, id, date);
      return res.status(200).json(chat);
    } catch (e) {
      next(e);
    }
  }

  async getChatRooms(req, res, next) {
    try {
      const userId = req.user.id;
      const chats = await messageService.getChatRooms(userId);
      return res.status(200).json(chats);
    } catch (e) {
      next(e);
    }
  }

  async addChatRoom(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const chat = await messageService.addChatRoom(userId, id);
      return res.status(200).json(chat);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new MessageController();
