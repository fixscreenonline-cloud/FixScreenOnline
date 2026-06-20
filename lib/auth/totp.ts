import speakeasy from "speakeasy";
import QRCode from "qrcode";

export function generateTotpSecret(email: string) {
  return speakeasy.generateSecret({
    name: `FixScreen Admin (${email})`,
    issuer: "FixScreen Admin",
    length: 32,
  });
}

export async function generateQrCodeDataUrl(otpauthUrl: string) {
  return QRCode.toDataURL(otpauthUrl);
}

export function verifyTotpToken(secret: string, token: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token: token.replace(/\s/g, ""),
    window: 1,
  });
}

export function generateRecoveryCodes(count: number): string[] {
  const codes: string[] = [];

  for (let i = 0; i < count; i++) {
    const segment = () =>
      Math.random().toString(36).substring(2, 6).toUpperCase();

    codes.push(`${segment()}-${segment()}`);
  }

  return codes;
}
