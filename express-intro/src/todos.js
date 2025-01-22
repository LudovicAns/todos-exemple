import express from "express";
import { TodoRepository } from "./database/repository/todo-repository.js";

export const todosRouteur = express.Router();

// ENDPOINT pour récuperer toutes les todos.
todosRouteur.get('/', async (req, rep) => {
    const allTodos = await TodoRepository.findAll();
    return rep.json(allTodos);
});

// ENDPOINT pour créer une todo.
todosRouteur.post('/', async (req, rep) => {
    // Récuperer les données du corps de la requete
    const newTodoContent = req.body.content;

    // Valider les données
    if (!newTodoContent || newTodoContent === "") {
        return rep.status(400).json({ message: "Contenu obligatoire" });
    }
    // Créer un objet representant la todo
    const newTodo = {
        contenu: newTodoContent,
        date: new Date(),
        isFinished: false
    }
    // Enregistrer la todo dans la BDD
    const savedTodo = await TodoRepository.create(newTodo);
    // Retourner un message de réussite
    rep.json({ message: "TODO_CREATED", todo: savedTodo });
});

// ENDPOINT pour récuperer une tache avec son ID.
todosRouteur.get('/:id', verifyTodoByID, async (req, rep) => {
    const todoID = req.params.id;
    const todoFromDB = await TodoRepository.findByID(todoID);
    return rep.json({ todo: todoFromDB });
});

// ENDPOINT pour modifier le contenu et/ou isFinished d'une tache
todosRouteur.put('/:id', verifyTodoByID, async (req, rep) => {
    const todoID = req.params.id;

    const contenu = req.body.contenu;
    const isFinished = req.body.isFinished;

    const todoFromDB = await TodoRepository.findByID(todoID);

    const newDataTodo = {
        contenu: contenu ? contenu : todoFromDB.contenu,
        isFinished: isFinished != null ? isFinished : todoFromDB.isFinished
    }
    //Mettre a jour la todo
    const updatedTodo = await TodoRepository.updateByID(todoID, newDataTodo);
    return rep.json({ message: "TODO_UPDATED", todo: updatedTodo })
});

// ENDPOINT pour supprimer une tache
todosRouteur.delete('/:id', verifyTodoByID, async (req, rep) => {
    const todoID = req.params.id;
    const deletedTodo = await TodoRepository.delete(todoID);
    return rep.json({ message: "TODO_DELETED", deleted: deletedTodo });
});

// Middleware pour verifier si une tache existe suivant l'id reçu dans les params
async function verifyTodoByID(req, rep, next) {
    const todoID = req.params.id;
    const todoFromDB = await TodoRepository.findByID(todoID);
    if (!todoFromDB) {
        return rep.status(404).json({ message: "TODO_NOT_FOUND" });
    }
    next();
}