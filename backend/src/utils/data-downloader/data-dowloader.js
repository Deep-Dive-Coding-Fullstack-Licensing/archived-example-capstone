import { v1 as uuid } from 'uuid';
import { setHash } from '../auth.utils';
import { insertProfile } from '../models/Profile';
import { insertTweet } from '../models/Tweet';
import * as fs from 'fs';
import * as csv from "csv-parser";
function ddcTweetDataDownloader() {
    async function main() {
        try {
            await downloadUsers();
        }
        catch (error) {
            console.error(error);
        }
    }
    return main();
    async function downloadUsers() {
        try {
            const results = [];
            fs.createReadStream('./tweet.csv')
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', async () => {
                try {
                    //A fake profile must be created to own the tweets being imported for the data downloader
                    const profileHash = await setHash("ILikeFakePasswordsWithNoSpaces");
                    const profile = {
                        profileId: uuid(),
                        profileAtHandle: "mxFakeAccount",
                        profileActivationToken: null,
                        profileAvatarUrl: "http://www.fillmurray.com/150/150",
                        profileEmail: "mxFakeAccount@fake-acounts.rus",
                        profileHash,
                        profilePhone: "505-866-5309"
                    };
                    console.log(await insertProfile(profile));
                    for (let result of results) {
                        const { tweetContent, tweetDate } = result;
                        const tweet = {
                            tweetId: null,
                            tweetProfileId: profile.profileId,
                            tweetContent,
                            tweetDate
                        };
                        console.log(await insertTweet(tweet));
                    }
                }
                catch (error) {
                    throw error;
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
}
ddcTweetDataDownloader()
    .then(finished => {
    console.log("finished");
}).catch(error => {
    console.error(error);
});
