
export interface Profile extends PartialProfile{
  profileId: string|null
}
export interface PartialProfile {

  profileAtHandle: string
  profileAvatarUrl: string
  profileEmail: string
  profilePhone: string
}

export interface SignIn {
  profileEmail: string,
  profilePassword: string
}

