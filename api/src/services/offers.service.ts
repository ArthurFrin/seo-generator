import { OffersSchema, OffersType } from "../schemas/offers.schema";

export class OffersService {
    static generateSchema(data: unknown): any {
        const validatedData = OffersSchema.parse(data);

        return {
            "@context": "https://schema.org",
            "@type": "Offer",
            "priceCurrency": validatedData.currency,
            "price": validatedData.price,
            "availability": validatedData.availability,
            "url": validatedData.url
        };
    }
}
