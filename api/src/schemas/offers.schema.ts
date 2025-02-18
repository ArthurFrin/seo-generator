import { z } from "zod";

export const OffersSchema = z.object({
    currency: z.string().length(3, "La devise doit contenir 3 lettres (ex: USD, EUR)"),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Le prix doit être un nombre valide"),
    availability: z.enum(["https://schema.org/InStock", "https://schema.org/OutOfStock", "https://schema.org/PreOrder"]),
    url: z.string().url("L'URL doit être valide"),
});

export type OffersType = z.infer<typeof OffersSchema>;
