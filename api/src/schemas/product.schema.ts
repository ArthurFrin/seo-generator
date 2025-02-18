import { z } from "zod";

export const ProductSchema = z.object({
    name: z.string().min(2, "Le nom du produit doit contenir au moins 2 caractères"),
    image: z.string().url("L'image doit être une URL valide"),
    description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
    brand: z.string().min(2, "La marque doit contenir au moins 2 caractères"),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Le prix doit être un nombre valide"),
    currency: z.string().length(3, "La devise doit contenir 3 lettres (ex: USD, EUR)"),
    availability: z.enum(["https://schema.org/InStock", "https://schema.org/OutOfStock", "https://schema.org/PreOrder"])
});
