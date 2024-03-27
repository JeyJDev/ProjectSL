import { z } from "zod";

//Validacion de datos para el registro de jugadores
export const recordPlayerSchema = z.object({
    games: z.number({
        required_error: 'Games is required'
    }),
    goals: z.number({
        required_error: 'goals is required'
    }),
    assists: z.number({
        required_error: 'Assits is required'
    }),
})