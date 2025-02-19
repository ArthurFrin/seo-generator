import { OrganizationSchema, OrganizationType } from "../schemas/organization.schema";

export class OrganizationService {
    static generateSchema(data: unknown): any {
        const validatedData = OrganizationSchema.parse(data);

        const schema: any = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": validatedData.name,
            "url": validatedData.url,
            "logo": validatedData.logo,
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": validatedData.phone,
                "contactType": "customer service"
            }
        };

        if (validatedData.ceo) {
            schema.ceo = {
                "@type": "Person",
                "name": validatedData.ceo.name,
                "jobTitle": validatedData.ceo.jobTitle,
                "worksFor": {
                    "@type": "Organization",
                },
                "url": validatedData.ceo.url
            };

            if (!validatedData.ceo.name) delete schema.ceo.name;
            if (!validatedData.ceo.jobTitle) delete schema.ceo.jobTitle;
            if (!validatedData.ceo.url) delete schema.ceo.url;
        }

        return schema;
    }
}
