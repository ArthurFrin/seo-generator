import { z } from "zod";

export const ProductSchema = z.object({
    name: z.string().min(2, "Le nom du produit doit contenir au moins 2 caractères"),
    image: z.union([z.string().url("L'image doit être une URL valide"), z.literal(""), z.undefined()]), // Accepte une URL valide ou vide
    description: z.union([z.string().min(10, "La description doit contenir au moins 10 caractères"), z.literal(""), z.undefined()]), // Accepte une description vide
    brand: z.string().min(2, "La marque doit contenir au moins 2 caractères"),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Le prix doit être un nombre valide"),
    currency: z.string().length(3, "La devise doit contenir 3 lettres (ex: USD, EUR)"),
    availability: z.union([
        z.enum(["https://schema.org/InStock", "https://schema.org/OutOfStock", "https://schema.org/PreOrder"]),
        z.literal(""), z.undefined()
    ]) // Accepte une valeur vide ou un état de disponibilité valide
});

export type ProductType = z.infer<typeof ProductSchema>;
