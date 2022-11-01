import { sql } from '../database.utils'

export interface Like {
  likeProfileId: string | null
  likeTweetId: string | null
  likeDate: Date | null
}

export async function insertLike (like: Like): Promise<string> {
  const {likeProfileId, likeTweetId} = like
  await sql `INSERT INTO "like" (like_profile_id, like_tweet_id, like_date) VALUES(${likeProfileId}, ${likeTweetId}, NOW())`
  return 'Tweet created successfully'
}

export async function deleteLike (like: Like): Promise<string> {
  const {likeProfileId, likeTweetId} = like
  await sql `DELETE FROM "like" WHERE like_profile_id = ${likeProfileId} AND like_tweet_id = ${likeTweetId}`
  return 'Tweet deleted successfully'
}

export async function selectLikeByLikeId (like: Like): Promise<Like|null> {
  const {likeProfileId, likeTweetId} = like
  const result = <Like[]> await sql`SELECT like_profile_id, like_tweet_id, like_date FROM "like" WHERE like_profile_id = ${likeProfileId} AND like_tweet_id = ${likeTweetId}`
  return result?.length === 1 ? result[0] : null
}

export async function selectLikesByLikeTweetId (likeTweetId: string): Promise<Like[]> {
  return <Like[]> await sql`SELECT like_profile_id, like_tweet_id, like_date FROM "like" WHERE like_tweet_id = ${likeTweetId}`
}