import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    contenu: { type: String, required: true },
    isFinished: { type: Boolean, required: true, default: false },
    date: { type: Date, required: true }
});

export const TodoModel = mongoose.model('Todos', todoSchema);