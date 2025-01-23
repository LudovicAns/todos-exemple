import express from "express";
import {UserRepository} from "./database/repository/user-repository.js";
import bcrypt from "bcrypt";
import {saltRounds} from "./crypto/bcrypt-utils.js";

export const usersRouter = express.Router();

// ============== ENDPOINTS ============== //
usersRouter.post('/register', async (req, rep) => {
    const {email, password, avatarURL} = req.body;

    if (!email || !password) {
        rep.status(400).json({message: "Email and password are required"});
        return;
    }

    const user = await UserRepository.findByEmail(email);

    if (user) {
        rep.status(401).json({message: "User with this email already exists"});
        return;
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            rep.status(500).json({message: "Error while creating user"});
        } else {
            const newUser = {
                email: email,
                password: hash,
                avatarURL: avatarURL
            }
            const savedUser = await UserRepository.create(newUser);

            if (!savedUser) {
                rep.status(500).json({message: "Error while creating user"});
                return;
            }

            rep.status(201).json({
                message: "User created", data: {
                    _id: savedUser._id,
                }
            });
        }
    })
});

// ============== MIDDLEWARES ============== //