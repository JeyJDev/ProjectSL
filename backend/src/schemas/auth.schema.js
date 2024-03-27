import { z } from "zod";

//Validacion de datos para el registro de jugadores
export const registerPlayerSchema = z.object({
    name: z.string({
        required_error: 'Name is required'
    }),
    lastname: z.string({
        required_error: 'Lastname is required'
    }),
    age: z.number({
        required_error: 'age is required'
    }),
    email: z.string({
        required_error: 'Email is required'  
    }).email({
        required_error: 'Invalid email'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6, {
        message: 'Password must be at least 6 characters'
    })
})

//Validación de datos para el registro de equipos
export const registerTeamSchema = z.object({
    name: z.string({
        required_error: 'Name is required'
    }),
    lastname: z.string({
        required_error: 'Lastname is required'
    }),
    teamName: z.string({
        required_error: 'Team name is required'
    }),
    email: z.string({
        required_error: 'Email is required'  
    }).email({
        required_error: 'Invalid email'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6, {
        message: 'Password must be at least 6 characters'
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required'  
    }).email({
        required_error: 'Invalid email'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6, {
        message: 'Password must be at least 6 characters'
    })
})