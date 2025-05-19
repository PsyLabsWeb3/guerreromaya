import { GetRelevantTweetsResponse } from "./types";

export const createCookieService = (
    apiKey: string,
    apiUrl: string,
    tweetsTopic: string
) => {
    const getRelevantTweets = async (): Promise<GetRelevantTweetsResponse> => {
        const startDate = "2025-01-01";
        const endDate = new Date().toISOString().split("T")[0];
        const apiEndpoint = `/feed/query/`;

        if(!apiKey || !apiUrl) {
            throw new Error("Invalid parameters");
        }

        console.log(`Fetching ${tweetsTopic} tweets from ${startDate} to ${endDate}.`);

        try {
            const url = apiUrl + apiEndpoint;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": apiKey,
                },
                body: JSON.stringify({
                    searchQuery: tweetsTopic,
                    startDate: startDate,
                    endDate: endDate,
                }),
            });

            if(!response.ok) {
                const error = await response.json();
                throw new Error(error?.message || response.statusText );
            }

            const data = await response.json();

            if(!data.success) {
                throw new Error(data.error);
            }

            data.ok = data.ok.entries.sort((a: any, b: any) => b.smartEngagementPoints - a.smartEngagementPoints);

            return data;
        } catch (error: any) {
            console.error("Cookie API Error: ", error.message);
            throw error;
        }
    };

    return { getRelevantTweets };
}