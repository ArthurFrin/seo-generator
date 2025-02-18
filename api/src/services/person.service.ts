import { PersonSchema, PersonType } from "../schemas/person.schema";

export class PersonService {
    static generateSchema(data: unknown): any {
        const validatedData = PersonSchema.parse(data);

        const jsonLd: any = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": validatedData.name
        };

        if (validatedData.jobTitle) {
            jsonLd.jobTitle = validatedData.jobTitle;
        }

        if (validatedData.company) {
            jsonLd.worksFor = {
                "@type": "Organization",
                "name": validatedData.company
            };
        }

        if (validatedData.url) {
            jsonLd.url = validatedData.url;
        }

        return jsonLd;
    }
}
