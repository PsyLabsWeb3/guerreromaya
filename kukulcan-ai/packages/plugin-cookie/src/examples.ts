import { ActionExample } from "@elizaos/core";

export const getRelevantTweetsExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "I wonder what the community thinks today?"
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me fetch the latest relevant tweets.",
                action: "COOKIE_GET_RELEVANT_TWEETS",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you fetch the most relevant tweets involving the community?"
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me fetch the latest relevant tweets.",
                action: "COOKIE_GET_RELEVANT_TWEETS",
            },
        }
    ]
];

export const checkTwitterHandleForRelevanteExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Is my handle part of the top users of the community in twitter? @Kukulcan_ai"
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me fetch the latest relevant tweets and check if your handle, @Kukulcan_ai, is part of the most relevant users.",
                action: "COOKIE_CHECK_HANDLE_RELEVANCE",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Is my twitter username @Kukulcan_ai relevant in the community?"
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me fetch the latest relevant tweets and check if your handle, @Kukulcan_ai, is part of the most relevant users.",
                action: "COOKIE_CHECK_HANDLE_RELEVANCE",
            },
        }
    ]
];