import * as z from "zod";
export const structureSchema = z.object({
    category: z.enum(["hardware", "software", "network"]),
    priority: z.enum(["low", "medium", "high"]),
    summary: z.string().min(1, "Summary is required"),
});