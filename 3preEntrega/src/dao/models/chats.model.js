import { Schema, model } from "mongoose";

const chatCollection = 'messages'

const chatSchema = new Schema(
    {
        user: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    }
);

const chatModel =  model(chatCollection, chatSchema)

export default chatModel;