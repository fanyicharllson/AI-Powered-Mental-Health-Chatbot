import { z } from "zod";

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must atleast be 3 characters")
    .max(50, "Username can't exit 50 characters"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(9, "Password must be atleast 9 characters"),
});
