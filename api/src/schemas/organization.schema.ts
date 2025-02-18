import { z } from "zod";
import { PersonSchema } from "./person.schema";

export const OrganizationSchema = z.object({
    name: z.string().min(2, "Le nom est requis"),
    url: z.string().url("L'URL doit être valide"),
    logo: z.string().url("Le logo doit être une URL valide"),
    phone: z.string().min(5, "Numéro de téléphone requis"),
    ceo: PersonSchema
});

export type OrganizationType = z.infer<typeof OrganizationSchema>;
