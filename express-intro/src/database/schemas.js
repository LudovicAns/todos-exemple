import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    contenu: {type: String, required: true},
    isFinished: {type: Boolean, required: true, default: false},
    date: {type: Date, required: true}
});

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatarURL: {type: String}
});

export const TodoModel = mongoose.model('Todos', todoSchema);
export const UserModel = mongoose.model('Users', userSchema);