import {z} from 'zod';

export const schema=z.object({
    name: z.string().trim().min(2,"Name at least 2 characters long").max(40,"name must be at most 40 characters long"),

    email:z.email("Invalid email"),

    password:z.string().min(8,"password must be at least 8 characters long").max(72,"password must be at most 72 charcters long").regex(/[A-Za-z]/).regex(/[0-9]/)
});
