import express from "express";
import { todosRouteur } from "./src/todos.js";
import { connectToDatabase } from "./src/database/index.js";


const PORT = 5000;

const app = express();

// Middleware pour servir des fichier statiquement (Servir un siteweb)
app.use(express.static('public'));

// Middleware pour parser le corps de la requete reçue sous format JSON.
app.use(express.json());

// Création d'un middleware personnalisé
const loggerMiddleware = (req, rep, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}
// Utilisation du middleware personnalisé
app.use(loggerMiddleware);

// Utilisation du middleware native d'express pour le routing
app.use("/api/todos", todosRouteur);

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
    // Utliser mongoose pour se connecté a la BDD Mongo
    connectToDatabase()
});
