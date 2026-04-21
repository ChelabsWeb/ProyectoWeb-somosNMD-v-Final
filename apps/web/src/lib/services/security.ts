import "server-only";
import crypto from "crypto";

export interface TokenPayload {
  bookingId: string;
  action: "confirm" | "reject";
  applicantName?: string;
  applicantEmail?: string;
  timeSlot?: string;
  sessionType?: string;
}

/**
 * Reads WEBHOOK_SECRET lazily so static analysis and test setup/teardown
 * can manipulate env without crashing at module load.
 */
function getSecretKey(): string {
  const key = process.env.WEBHOOK_SECRET;
  if (!key || key.trim().length === 0) {
    throw new Error(
      "Missing WEBHOOK_SECRET environment variable. " +
        "Generate with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\" " +
        "and set it in apps/web/.env.local and in Vercel project environment."
    );
  }
  return key;
}

/**
 * Creates a deterministic HMAC-SHA256 signature for the given string.
 */
export function createSignature(payload: string): string {
  return crypto.createHmac("sha256", getSecretKey()).update(payload).digest("hex");
}

/**
 * Creates a secure token for a booking action.
 * Encodes all necessary data since there is no persistence layer.
 */
export function generateSecureToken(
  payloadData: Omit<TokenPayload, "expiryTimestamp">,
  expiresInDays: number = 7
): string {
  const expiryTimestamp = Date.now() + expiresInDays * 24 * 60 * 60 * 1000;
  const dataToEncode = { ...payloadData, expiryTimestamp };

  const payloadStr = JSON.stringify(dataToEncode);
  const signature = createSignature(payloadStr);

  const encodedPayload = Buffer.from(payloadStr).toString("base64url");

  return `${encodedPayload}.${signature}`;
}

/**
 * Verifies a secure token and returns the parsed payload if valid.
 * Returns null for any invalid, expired, or tampered token — including
 * the case where WEBHOOK_SECRET is missing (callers must never treat a
 * missing-secret server as "all tokens valid").
 */
export function verifySecureToken(token: string): TokenPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [encodedPayload, providedSignature] = parts;

    const payloadStr = Buffer.from(encodedPayload, "base64url").toString("utf-8");
    const parsedData = JSON.parse(payloadStr);

    if (
      !parsedData.bookingId ||
      (parsedData.action !== "confirm" && parsedData.action !== "reject") ||
      !parsedData.expiryTimestamp
    ) {
      return null;
    }

    if (Date.now() > parsedData.expiryTimestamp) {
      console.warn(`[Security] Token expired for booking ${parsedData.bookingId}`);
      return null;
    }

    const expectedSignature = createSignature(payloadStr);

    const providedBuffer = Buffer.from(providedSignature, "hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");

    if (providedBuffer.length !== expectedBuffer.length) {
      return null;
    }

    if (crypto.timingSafeEqual(providedBuffer, expectedBuffer)) {
      return parsedData as TokenPayload;
    }

    return null;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message !== "Input length must be a multiple of 16 when decoding with a block cipher"
    ) {
      console.error("[Security] Error verifying secure token:", error);
    }
    return null;
  }
}
