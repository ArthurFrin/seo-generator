import { ProductSchema } from "../schemas/product.schema";


export class ProductService {
    static generateProductSchema(data: any) {
        // Validation des données avec Zod
        const validatedData = ProductSchema.parse(data);

        // Construction du JSON-LD
        return {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": validatedData.name,
            "image": validatedData.image,
            "description": validatedData.description,
            "brand": {
                "@type": "Brand",
                "name": validatedData.brand
            },
            "offers": {
                "@type": "Offer",
                "price": validatedData.price,
                "priceCurrency": validatedData.currency,
                "availability": validatedData.availability
            }
        };
    }
}
