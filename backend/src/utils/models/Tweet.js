import { sql } from '../database.utils';
export async function insertTweet(tweet) {
    const { tweetProfileId, tweetContent } = tweet;
    await sql `INSERT INTO tweet (tweet_id, tweet_profile_id, tweet_content, tweet_date) VALUES(gen_random_uuid(), ${tweetProfileId}, ${tweetContent}, NOW())`;
    return 'Tweet created successfully';
}
export async function selectAllTweets() {
    return await sql `SELECT tweet_id, tweet_profile_id, tweet_content, tweet_date FROM tweet ORDER BY tweet_date DESC`;
}
export async function selectTweetByTweetId(tweetId) {
    const result = await sql `SELECT tweet_id, tweet_profile_id, tweet_content, tweet_date FROM tweet WHERE tweet_id = ${tweetId}`;
    return result?.length === 1 ? result[0] : null;
}
export async function selectTweetsByTweetProfileId(tweetProfileId) {
    return await sql `SELECT tweet_id, tweet_profile_id, tweet_content, tweet_date FROM tweet WHERE tweet_profile_id = ${tweetProfileId}`;
}
