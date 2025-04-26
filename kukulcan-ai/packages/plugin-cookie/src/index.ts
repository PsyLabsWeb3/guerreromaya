import { Plugin } from "@elizaos/core";
import { getRelevantTweetsAction } from "./actions/getRelevantTweets";
import { checkTwitterHandleForRelevanceAction } from "./actions/checkTwitterHandleForRelevance";

export const cookiePlugin: Plugin = {
    name: "cookie",
    description: "Cookie Swarm API plugin for Eliza",
    actions: [getRelevantTweetsAction, checkTwitterHandleForRelevanceAction],
    evaluators: [],
    providers: [],
};

export default cookiePlugin;