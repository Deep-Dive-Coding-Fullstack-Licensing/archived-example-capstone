
export interface Profile extends PartialProfile{
  profileId: string|null
}
export interface PartialProfile {

  profileAtHandle: string
  profileAvatarUrl: string|null
  profileEmail: string
  profilePhone: string
}

export interface SignIn {
  profileEmail: string,
  profilePassword: string
}
export interface SignUp extends PartialProfile{
    profilePassword: string,
    profilePasswordConfirm: string
}