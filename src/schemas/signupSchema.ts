import {z} from "zod"

export const usernameValidation = z
    .string()
    .min(2, "Username must be at least 2 characters")
    .min(20, "Username must be nomore than 20 characters")
    .regex(/^[a-zA-Z0-9._-]{3,16}$/, "Username must not contain spacial characters")


export const SignUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters"})
})
