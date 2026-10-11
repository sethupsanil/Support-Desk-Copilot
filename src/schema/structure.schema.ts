import * as z from "zod";
export const structureSchema = z.object({
    category: z.enum(["hardware", "software", "network", "other"]).describe("The category of the support ticket"),
    priority: z.enum(["low", "medium", "high"]).describe("The priority of the support ticket"),
    summary: z.string().min(1, "Summary is required").describe("A brief summary of the support ticket"),
});