import express from "express";
import {UserRepository} from "../repository/user-repository.js";
import bcrypt from "bcrypt";
import {saltRounds} from "../../crypto/bcrypt-utils.js";
import {registerValidation} from "../../validations/users.js";

export const usersRouter = express.Router();

usersRouter.post('/register', async (req, rep) => {
    const {email, password, avatarURL} = req.body;

    const validateUser = registerValidation(req.body);

    if (!validateUser.success) {
        rep.status(400).json({message: JSON.parse(validateUser.error.message)[0].message});
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