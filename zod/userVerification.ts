import { z } from "zod";

const userVerificationSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address").trim().toLowerCase(),

    password: z.string().min(8, "Password must be at least 8 characters long").regex(/[A-Z]/,"Password must contain at least one uppercase letter").regex(/[a-z]/,"Password must contain at least one lowercase letter").regex(/[0-9]/,"Password must contain at least one number").regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/,"Password must contain at least one special character"),

    city: z.string().min(3, "City must be at least 3 characters long"),
    country: z.string().min(3, "Country must be at least 3 characters long"),
    state: z.string().min(3, "State must be at least 3 characters long"),

    username: z.string().min(3, "Username must be at least 3 characters long").regex(/[A-Z]/,"Username must contain at least one uppercase letter").regex(/[a-z]/,"Username must contain at least one lowercase letter").regex(/[0-9]/,"Username must contain at least one number").regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/,"Username must contain at least one special character"),
    
    
    bio: z.string().min(3, "Bio must be at least 3 characters long").max(200, "Bio must be at most 200 characters long"),
    interests: z.array(z.string().min(3, "Interest must be at least 3 characters long"))
});

export { userVerificationSchema };