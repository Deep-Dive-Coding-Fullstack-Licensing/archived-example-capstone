import {NextFunction, Request, Response} from 'express';
import "express-session";

import uuid from "uuid";
import {generateJwt, validatePassword} from "../../utils/auth.utils";
import {Profile} from "../../utils/interfaces/Profile";
import {selectProfileByProfileEmail} from "../../utils/profile/selectProfileByProfileEmail";



export async function signInController(request: Request, response: Response, nextFunction: NextFunction): Promise<Response | undefined> {
    try {
        const authenticate = async () => {

            const {profilePassword} = request.body;

            const {profileEmail} = request.body
            const mySqlResult = await selectProfileByProfileEmail(profileEmail);

            console.log("my sql result", mySqlResult)

            // @ts-ignore
            const {profileId, profileAtHandle, profileAvatarUrl, profilePhone, profileHash, profileActivationToken} = mySqlResult

            const profile: Profile = {
                profileId,
                profileAtHandle,
                profileAvatarUrl,
                profileEmail,
                profilePhone,
                profileHash,
                profileActivationToken
            }
            console.log("profile info", profile)

            const signature: string = uuid();
            const authorization: string = generateJwt({
                profileId,
                profileAtHandle,
                profileAvatarUrl,
                profileEmail,
                profilePhone
            }, signature);

            const signInFailed = (message: string) => response.json({
                status: 400,
                data: null,
                message
            });

            const signInSuccessful = () => {

                // commented out for testing purposes
                // if(profile.profileActivationToken !== null) {
                // 	signInFailed("please activate your account")
                // }

                if (request.session) {
                    request.session.profile = profile;
                    request.session.jwt = authorization;
                    request.session.signature = signature;
                }

                response.header({
                    authorization
                });

                return response.json({status: 200, data: null, message: "sign in successful"})
            };


            const isPasswordValid: boolean = profile && await validatePassword(profile.profileHash, profilePassword);

            return isPasswordValid ? signInSuccessful() : signInFailed("Invalid email or password");
        }

        return authenticate()

    } catch (error: any) {
        return response.json({status: 500, data: null, message: error.message})
    }
}
