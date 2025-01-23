import { z } from "zod";

const registerSchema = z.object({
    email: z.string({required_error: "Email is required"}).email({message: "Email is invalid"}),
    password: z.string({required_error: "Password is required"}).min(6, "Password must be at least 6 characters"),
    avatarURL: z.string().url({message: "Avatar URL is invalid"}).nullable()
});

export const registerValidation = (data) => {
    const result = registerSchema.safeParse(data);
    return result;
}