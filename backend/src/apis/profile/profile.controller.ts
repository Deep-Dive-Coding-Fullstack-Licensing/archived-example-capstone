import {Request, Response} from "express";
import {PartialProfile, Profile} from "../../utils/interfaces/Profile";
import {selectPartialProfileByProfileId} from "../../utils/profile/selectPartialProfileByProfileId";
import {Status} from "../../utils/interfaces/Status";
import {selectWholeProfileByProfileId} from "../../utils/profile/selectWholeProfileByProfileId";
import {updateProfile} from "../../utils/profile/updateProfile";

export async function putProfileController(request: Request, response: Response) : Promise<Response>{
  try {
    const {profileId} = request.params
    const {profileEmail, profileAvatarUrl, profileAtHandle, profilePhone} = request.body
    const profile = <Profile>request.session.profile
    const profileIdFromSession = <string>profile.profileId

    const preformUpdate = async (partialProfile: PartialProfile) : Promise<Response> => {
      const previousProfile: Profile = await selectWholeProfileByProfileId(<string>partialProfile.profileId)
      const newProfile: Profile = {...previousProfile, ...partialProfile}
      await updateProfile(newProfile)
      return response.json({status: 200, data: null, message: "Profile successfully updated"})
    }

    const updateFailed = (message: string) : Response => {
      return response.json({status: 400, data: null, message})
    }

    return profileId === profileIdFromSession
      ? preformUpdate({profileId, profileAtHandle, profileAvatarUrl, profileEmail, profilePhone})
      : updateFailed("you are not allowed to preform this action")
  } catch (error) {
    return response.json( {status:400, data: null, message: error.message})
  }
}


export async function getProfileByProfileId(request: Request, response: Response) : Promise<Response> {
  try {
    const {profileId} = request.params;
    const mySqlResult = await selectPartialProfileByProfileId(profileId);
    const data = mySqlResult ?? null
    const status: Status = {status: 200, data, message: null}
    return response.json(status)

  } catch (error) {
    return(response.json({status: 400, data: null, message: error.message}))

  }

}