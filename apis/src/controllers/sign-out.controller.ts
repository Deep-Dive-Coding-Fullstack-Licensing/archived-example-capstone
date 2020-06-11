import { Tweet } from '../interfaces/Tweet';
import { Status } from '../interfaces/Status';
import {Request, Response} from "express";

export function signOut(request: Request, response : Response) {
  let status : Status = {status: 200, message: "sign out successful", data: null};
  const {session}  = request;

  const executeSignOut = () => {
    // @ts-ignore: broken typing is requiring a callback function that is optional.
    session?.destroy()

  };

  const signOutFailed = () => {
    status.status = 400;
    status.message = "you are not signed in";
  };

  session ? executeSignOut() : signOutFailed();

  return response.json(status)
}

