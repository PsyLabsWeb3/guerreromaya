import {
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
    composeContext,
    generateText,
    ModelClass,
} from "@elizaos/core";
import { validateCookieConfig } from "../environment";
import { checkTwitterHandleForRelevanteExamples } from "../examples";
import { createCookieService } from "../services";

export const checkTwitterHandleForRelevanceAction: Action = {
    name: "COOKIE_CHECK_HANDLE_RELEVANCE",
    similes: [
        "CHECK_HANDLE_RELEVANCE",
        "HANDLE_RELEVANT",
        "TWITTER_USER_RELEVANT"
    ],
    description: "Compare the user's twitter handle to the most relevant users in the community.",
    validate: async (runtime: IAgentRuntime) => {
        await validateCookieConfig(runtime);
        return true;
    },
    handler: async (
        _runtime: IAgentRuntime,
        _message: Memory,
        _state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        const config = await validateCookieConfig(_runtime);
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

            const context = `Extract the user's handle or twitter username from the user's message. The message is:
            ${_message.content.text}

            Only respond with the user's handle, do not include any other text.`;

            const userHandle = await generateText({
                runtime: _runtime,
                context,
                modelClass: ModelClass.SMALL,
                stop: ["\n"],
            });

            const topUsers = relevantTweetsData.ok.slice(0, 10).filter(tweet => tweet?.author?.username);

            const foundMatch = topUsers.find(tweet => userHandle.includes(tweet.author.username));

            if(callback) {
                let callbackText;

                if(foundMatch) {
                    callbackText = `Congratulations! So far, your twitter handle ${userHandle} is amongst the most active users in this season.\nKeep it up and you'll be receiving a $MZCAL reward in our Guerrero Maya ecosystem due to your participation.`;
                } else {
                    callbackText = `Sorry, as of this moment your twitter handle ${userHandle} is not part of the most active users in the Guerrero Maya ecosystem. Stay updated and follow our official accounts as we will distribute rewards each season.`;
                }

                const newMemory: Memory = {
                    userId: _message.agentId,
                    agentId: _message.agentId,
                    roomId: _message.roomId,
                    content: {
                        text: callbackText,
                        action: "COOKIE_HANDLE_RELEVANCE_RESPONSE",
                        source: _message.content?.source,
                    },
                };
                
                await _runtime.messageManager.createMemory(newMemory);

                callback(newMemory.content);

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
    examples: checkTwitterHandleForRelevanteExamples as ActionExample[][],
} as Action;