import {
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
} from "@elizaos/core";
import { validateCookieConfig } from "../environment";
import { getRelevantTweetsExamples } from "../examples";
import { createCookieService } from "../services";

export const getRelevantTweetsAction: Action = {
    name: "COOKIE_GET_RELEVANT_TWEETS",
    similes: [
        "GET_TWEETS",
        "FETCH_TWEETS",
        "Get tweets",
        "Fetch tweets",
        "Relevant tweets"
    ],
    description: "Fetch the most relevant tweets about your set topic.",
    validate: async (runtime: IAgentRuntime) => {
        await validateCookieConfig(runtime);
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        _message: Memory,
        _state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        const config = await validateCookieConfig(runtime);
        const cookieService = createCookieService(
            config.COOKIE_API_KEY,
            config.COOKIE_API_URL,
            config.TWEETS_TOPIC
        );

        try {
            const relevantTweetsData = await cookieService.getRelevantTweets();
            elizaLogger.success(
                `Successfully fetched relevant tweets.`
            );
            if(callback) {
                const firstValidTweet = relevantTweetsData.ok.find(tweet => tweet?.author?.username);
                const topUsers = relevantTweetsData.ok.slice(0, 10).filter(tweet => tweet?.author?.username);

                const totalEngagementsCount = topUsers.reduce((sum, tweet) => sum + BigInt(tweet.smartEngagementPoints), BigInt(0));
                const rewardsPool = BigInt(config.GUERRERO_MAYA_REWARD_POOL);

                const topUsersList = topUsers.map(tweet => {
                    const reward = (rewardsPool * BigInt(tweet.smartEngagementPoints)) / totalEngagementsCount;
                    return `User: ${tweet.author.username}, smartEngagementPoints: ${tweet.smartEngagementPoints}, Guerrero Maya community reward: ${reward.toString()}`;
                }).join("\n");

                callback({
                    text: `Here is a relevant tweet from user ${firstValidTweet.author.username}:\n\n${firstValidTweet.text}\n\nHere are the top community participants sorted by engagement:\n\n${topUsersList}\n\nUsers on this list by the end of the minigame will receive rewards in our Guerrero Maya ecosystem based on their score. If you can't see your handle on the list, stay updated and follow our official accounts as we will distribute rewards each season.`
                });
                return true;
            }
        } catch(error: any) {
            elizaLogger.error("Error in Cookie plugin handler: ", error.message);
            callback({
                text: `Error fetching relevant tweets: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getRelevantTweetsExamples as ActionExample[][],
} as Action;