import { Schema, model } from 'mongoose';

const userCollection = 'users';

const userSchema = new Schema(
    {
        first_name: String,
        last_name: String,
        email: {
            type: String,
            unique: true,
            required: true
        },
        cart: String,
        role: {
            type: String,
            default: "user"
        },
        age: Number,
        password: String
    }
);

const userModel = model(userCollection, userSchema);

export default userModel;