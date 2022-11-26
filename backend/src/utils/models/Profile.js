import { sql } from '../database.utils';
export async function insertProfile(profile) {
    const { profileActivationToken, profileAtHandle, profileAvatarUrl, profileEmail, profileHash, profilePhone } = profile;
    await sql `INSERT INTO profile(profile_id, profile_activation_token, profile_at_handle, profile_avatar_url, profile_email, profile_hash, profile_phone) VALUES (gen_random_uuid() , ${profileActivationToken}, ${profileAtHandle}, ${profileAvatarUrl}, ${profileEmail}, ${profileHash}, ${profilePhone})`;
    return 'Profile Successfully Created';
}
export async function selectPartialProfileByProfileId(profileId) {
    const result = await sql `SELECT profile_id, profile_at_handle, profile_avatar_url, profile_email, profile_phone from profile WHERE profile_id = ${profileId}`;
    return result?.length === 1 ? result[0] : null;
}
export async function selectProfileByProfileActivationToken(profileActivationToken) {
    const result = await sql `SELECT profile_id, profile_activation_token, profile_at_handle, profile_avatar_url, profile_email, profile_hash, profile_phone FROM profile WHERE profile_activation_token = ${profileActivationToken}`;
    return result?.length === 1 ? result[0] : null;
}
export async function selectProfileByProfileEmail(profileEmail) {
    const result = await sql `SELECT profile_id, profile_activation_token, profile_at_handle, profile_avatar_url, profile_email, profile_hash, profile_phone FROM profile WHERE profile_email = ${profileEmail}`;
    return result?.length === 1 ? result[0] : null;
}
export async function selectWholeProfileByProfileId(profileId) {
    const result = await sql `SELECT profile_id, profile_activation_token, profile_at_handle, profile_avatar_url, profile_email, profile_hash, profile_phone from profile WHERE profile_id = ${profileId}`;
    return result?.length === 1 ? result[0] : null;
}
export async function updateProfile(profile) {
    const { profileId, profileActivationToken, profileAtHandle, profileAvatarUrl, profileEmail, profileHash, profilePhone } = profile;
    await sql `UPDATE profile SET profile_activation_token = ${profileActivationToken}, profile_at_handle = ${profileAtHandle}, profile_avatar_url = ${profileAvatarUrl}, profile_email = ${profileEmail}, profile_hash = ${profileHash}, profile_phone = ${profilePhone} WHERE profile_id = ${profileId}`;
    return 'Profile successfully updated';
}
