import { z } from "zod";

export const PersonSchema = z.object({
    name: z.string().min(2, "Le nom est requis"),
    jobTitle: z.string().optional(), // Optionnel sans contrainte
    company: z.string().optional(), // Optionnel sans contrainte
    url: z.union([z.string().url("L'URL doit être valide"), z.literal(""), z.undefined()]), // Accepte une URL valide, une chaîne vide ou undefined
});

export type PersonType = z.infer<typeof PersonSchema>;
