import { z } from "zod";

export const EventSchema = z.object({
    name: z.string().min(2),
    startDate: z.string().min(2),
    endDate: z.string().min(2),
    location: z.string().min(2),
    address: z.string().optional(),
    organizer: z.string().min(2),
});

export type EventType = z.infer<typeof EventSchema>;
