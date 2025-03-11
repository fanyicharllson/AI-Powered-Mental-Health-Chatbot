import { z } from "zod";

export const SignUpSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(9, "Password is required"),
});
