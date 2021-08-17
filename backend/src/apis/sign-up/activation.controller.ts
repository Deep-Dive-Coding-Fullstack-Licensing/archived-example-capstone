import {NextFunction, Request, Response} from "express";
import {selectProfileByProfileActivationToken} from "../../utils/profile/selectProfileByProfileActivationToken";
import {Profile} from "../../utils/interfaces/Profile";
import {updateProfile} from "../../utils/profile/updateProfile";
import {Status} from '../../utils/interfaces/Status';


export async function activationController(request: Request, response: Response, nextFunction: NextFunction): Promise<Response<Status>> {
  const {activation} = request.params
  try {

    const profile = await selectProfileByProfileActivationToken(activation)

    const activationFailed = () : Response => response.json({
      status: 400,
      data: null,
      message: "Account activation has failed. Have you already activated this account"
    });

    const activationSucceeded = async (profile: Profile):Promise<Response> => {
      const updatedProfile = {...profile, profileActivationToken: null}
      await updateProfile(updatedProfile)
      return response.json({
        status: 200,
        data: null,
        message: "Account activation was successful"
      });
    }

    return profile ? await activationSucceeded(profile) : activationFailed()

  } catch (error) {
    return response.json({status: 500, data: null, message: error.message})
  }
}