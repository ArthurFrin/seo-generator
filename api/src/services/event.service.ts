import { EventSchema, EventType } from "../schemas/event.schema";

export class EventService {
    static generateSchema(data: unknown): any {
        const validatedData = EventSchema.parse(data);

        const eventSchema: any = {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": validatedData.name,
            "startDate": validatedData.startDate,
            "endDate": validatedData.endDate,
            "location": {
                "@type": "Place",
                "name": validatedData.location
            },
            "organizer": {
                "@type": "Organization",
                "name": validatedData.organizer
            }
        };

        if (validatedData.address) {
            eventSchema.location.address = validatedData.address;
        }

        return eventSchema;
    }
}
