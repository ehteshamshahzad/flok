import * as crypto from 'crypto';

export function hashFunction(password: string, salt: string) {
  const hash = crypto.createHmac(
    'sha512',
    salt
  ); /** Hashing algorithm sha512 */
  hash.update(password);
  return hash.digest('hex');
}
