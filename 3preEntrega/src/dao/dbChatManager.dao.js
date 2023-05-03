import messageModel from "./models/chats.model.js";

export default class Messages {
  constructor() {
    console.log("Working messages on DB");
  };

  getMessages = async () => {
    const messages = await messageModel.find();

    return messages.map((message) => message.toObject());
  };

  addMessage = async (user, message) => {
    return await messageModel.create({ user, message });
  };
};