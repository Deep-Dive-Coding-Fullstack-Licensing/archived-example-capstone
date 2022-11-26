import * as argon2 from 'argon2';
import { sign } from 'jsonwebtoken';
import * as crypto from 'crypto';
export function generateJwt(payload, signature) {
    const setExpInSecondsSinceEpoch = (currentTimestamp) => {
        const oneHourInMilliseconds = 3600000 * 3;
        const futureTimestamp = Math.round(currentTimestamp) + oneHourInMilliseconds;
        const futureTimestampInSeconds = futureTimestamp / 1000;
        return Math.round(futureTimestampInSeconds);
    };
    const iat = new Date().getTime();
    const exp = setExpInSecondsSinceEpoch(iat);
    return sign({ exp, ...payload }, signature);
}
export function setActivationToken() {
    return crypto.randomBytes(16).toString('hex');
}
export async function setHash(password) {
    return await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        hashLength: 32
    });
}
export async function validatePassword(hash, password) {
    return await argon2.verify(hash, password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        hashLength: 32
    });
}
