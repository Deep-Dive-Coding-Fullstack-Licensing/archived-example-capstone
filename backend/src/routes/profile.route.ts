import {getProfileByProfileId, putProfileController} from "../controllers/profile.controller";
import {Router} from "express";
import {asyncValidatorController} from "../controllers/asyncValidator.controller";
import {check, checkSchema} from "express-validator";
import {isLoggedIn} from "../controllers/isLoggedIn.controller";
import {profileValidator} from "../validators/profile.validator";

export const ProfileRoute = Router();
ProfileRoute.route('/')
  .post(putProfileController);

ProfileRoute.route("/:profileId")
  .get(
    asyncValidatorController([
      check("profileId", "please provide a valid profileId").isUUID()
    ])
    , getProfileByProfileId
  )
  .put(isLoggedIn, asyncValidatorController(checkSchema(profileValidator)), putProfileController)
