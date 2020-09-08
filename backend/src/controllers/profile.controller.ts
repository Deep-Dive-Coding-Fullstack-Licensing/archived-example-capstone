import {Request, Response} from "express";
import {PartialProfile, Profile} from "../../utils/interfaces/Profile";
import {selectPartialProfileByProfileId} from "../../utils/profile/selectPartialProfileByProfileId";
import {Status} from "../../utils/interfaces/Status";
import {selectWholeProfileByProfileId} from "../../utils/profile/selectWholeProfileByProfileId";
import {body} from "express-validator";
import {updateProfile} from "../../utils/profile/updateProfile";

export async function putProfileController(request: Request, response: Response) {
  const {profileId}  = request.body
  const partialProfile: PartialProfile = request.body
  const profileIdFromSession: string = <string>request.session?.profile.profileId

  const preformUpdate = async (partialProfile: PartialProfile) => {
    const previousProfile: Profile = await selectWholeProfileByProfileId(<string>partialProfile.profileId)
    const newProfile : Profile = { ...previousProfile,  ...partialProfile }
    console.log("updated profile", newProfile)
    await updateProfile(newProfile)

    return response.json({status: 200, data: null, message: "Profile successfully updated"})
  }

  const preformFailedUpdate = (message: string ) => {
    return response.json({status:418, data: null, message})
  }

 return  profileId === profileIdFromSession
   ? preformUpdate(partialProfile)
   : preformFailedUpdate("you are not allowed to preform this action")

}

export async function getProfileByProfileId(request: Request, response: Response) {

  const {profileId} = request.params;
  const mySqlResult = await selectPartialProfileByProfileId(profileId);
  const data = mySqlResult ?? null
  const status: Status = {status: 200, data, message: null}
  return response.json(status)
}