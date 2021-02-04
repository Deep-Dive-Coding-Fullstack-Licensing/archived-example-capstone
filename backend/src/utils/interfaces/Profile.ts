export interface PartialProfile {
    profileId : string|null,
    profileAtHandle: string,
    profileAvatarUrl: string,
    profileEmail: string,
    profilePhone: string,
}

export interface Profile {
    profileId : string|null,
    profileActivationToken : string|null,
    profileAtHandle: string,
    profileAvatarUrl: string,
    profileEmail: string,
    profileHash: string,
    profilePhone: string,
}
