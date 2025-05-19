import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const cookieEnvSchema = z.object({
    COOKIE_API_KEY: z.string().min(1, "Cookie API Key required"),
    COOKIE_API_URL: z.string().min(1, "Cookie API URL required"),
    TWEETS_TOPIC: z.string().min(1, "Cookie tweets topic required"),
    GUERRERO_MAYA_REWARD_POOL: z.string().min(1, "Reward pool required"),
});

export type cookieConfig = z.infer<typeof cookieEnvSchema>;

export async function validateCookieConfig(
    runtime: IAgentRuntime
): Promise<cookieConfig> {
    try {
        const config = {
            COOKIE_API_KEY: runtime.getSetting("COOKIE_API_KEY"),
            COOKIE_API_URL: runtime.getSetting("COOKIE_API_URL"),
            TWEETS_TOPIC: runtime.getSetting("TWEETS_TOPIC"),
            GUERRERO_MAYA_REWARD_POOL: runtime.getSetting("GUERRERO_MAYA_REWARD_POOL"),
        };
        return cookieEnvSchema.parse(config);
    } catch (error) {
        console.log("error::::", error);
        if(error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `Cookie API configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}