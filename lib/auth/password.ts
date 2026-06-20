import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function hashRecoveryCodes(codes: string[]): Promise<string> {
  const hashed = await Promise.all(codes.map((code) => hashPassword(code)));

  return JSON.stringify(hashed);
}

export async function verifyRecoveryCode(
  code: string,
  storedHashJson: string,
): Promise<{ valid: boolean; remainingHashes: string[] }> {
  const hashes: string[] = JSON.parse(storedHashJson);
  const normalized = code.replace(/\s/g, "").toUpperCase();

  for (let i = 0; i < hashes.length; i++) {
    const match = await bcrypt.compare(normalized, hashes[i]);

    if (match) {
      const remainingHashes = hashes.filter((_, index) => index !== i);

      return { valid: true, remainingHashes };
    }
  }

  return { valid: false, remainingHashes: hashes };
}
