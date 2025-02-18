import { OrganizationSchema, OrganizationType } from "../schemas/organization.schema";

export class OrganizationService {
    static generateSchema(data: unknown): any {
        const validatedData = OrganizationSchema.parse(data);

        return {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": validatedData.name,
            "url": validatedData.url,
            "logo": validatedData.logo,
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": validatedData.phone,
                "contactType": "customer service"
            },
            "ceo": {
                "@type": "Person",
                "name": validatedData.ceo.name,
                "jobTitle": validatedData.ceo.jobTitle,
                "worksFor": {
                    "@type": "Organization",
                    "name": validatedData.ceo.company
                },
                "url": validatedData.ceo.url
            }
        };
    }
}
