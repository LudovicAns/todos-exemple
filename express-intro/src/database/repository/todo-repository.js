import { TodoModel } from "../schemas.js"

export const TodoRepository = {
    create: async (data) => {
        const newTodo = new TodoModel(data);
        const savedTodo = await newTodo.save();
        return savedTodo;
    },
    findAll: async () => {
        return await TodoModel.find();
    },
    findByID: async (id) => {
        try {
            return await TodoModel.findById(id);
        } catch (err) {
            return null
        }
    },
    updateByID: async (id, newData) => {
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            id,
            newData,
            { new: true }
        );
        return updatedTodo
    },
    delete: async (id) => {
        return await TodoModel.findByIdAndDelete(id);
    }
}