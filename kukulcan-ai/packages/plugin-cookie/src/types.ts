export interface Author {
    username: string;
}

export interface Tweet {
    author: Author;
    createdAt: string;
    engagementsCount: number;
    impressionsCount: number;
    isQuote: boolean;
    isReply: boolean;
    likesCount: number;
    quotesCount: number;
    repliesCount: number;
    retweetsCount: number;
    smartEngagementPoints: number;
    text: string;
    matchingScore: number;
}

export interface GetRelevantTweetsResponse {
    ok: Tweet[];
    success: boolean;
    error: string | null;
}