import * as argon2 from 'argon2'
import { sign } from 'jsonwebtoken'

import crypto from 'crypto'

export function generateJwt (payload: object, signature: string): string {
  const setExpInSecondsSinceEpoch = (currentTimestamp: number): number => {
    const oneHourInMilliseconds: number = 3600000 * 3
    const futureTimestamp: number = Math.round(currentTimestamp) + oneHourInMilliseconds
    const futureTimestampInSeconds: number = futureTimestamp / 1000
    return Math.round(futureTimestampInSeconds)
  }

  const iat = new Date().getTime()
  const exp = setExpInSecondsSinceEpoch(iat)
  return sign({ exp, ...payload }, signature)
}

export function setActivationToken (): string {
  return crypto.randomBytes(16).toString('hex')
}

export async function setHash (password: string): Promise<string> {
  return await argon2.hash(
    password,
    {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      hashLength: 32
    })
}

export async function validatePassword (hash: string, password: string): Promise<boolean> {
  return await argon2.verify(
    hash,
    password,
    {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      hashLength: 32
    })
}
