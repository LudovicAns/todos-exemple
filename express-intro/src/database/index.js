import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/todos-site";

export async function connectToDatabase() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connecté a la base de données");
    } catch (err) {
        console.error("Non Connecté a la base de données");
        console.log(err);
    }
}