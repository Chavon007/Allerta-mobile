import z from "zod";

export const addContactSchema = z.object({
  identifier: z.string().min(1, "Please enter a username or email"),
});

export type AddContactDTO = z.infer<typeof addContactSchema>;
