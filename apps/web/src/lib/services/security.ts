import "server-only";
import crypto from "crypto";

const SECRET_KEY = process.env.WEBHOOK_SECRET || "default_development_secret_key_change_me_in_prod!";

export interface TokenPayload {
  bookingId: string;
  action: "confirm" | "reject";
  applicantName?: string;
  applicantEmail?: string;
  timeSlot?: string;
  sessionType?: string;
}

/**
 * Creates a deterministic HMAC-SHA256 signature for the given string
 */
export function createSignature(payload: string): string {
  if (!process.env.WEBHOOK_SECRET && process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test") {
    console.warn("WARNING: WEBHOOK_SECRET is not set in production. Using default fallback key is unsafe.");
  }
  
  return crypto.createHmac("sha256", SECRET_KEY).update(payload).digest("hex");
}

/**
 * Creates a secure token for a booking action
 * Encodes all necessary data since we have no database
 */
export function generateSecureToken(payloadData: Omit<TokenPayload, "expiryTimestamp">, expiresInDays: number = 7): string {
  // Calculate expiration timestamp
  const expiryTimestamp = Date.now() + (expiresInDays * 24 * 60 * 60 * 1000);
  const dataToEncode = { ...payloadData, expiryTimestamp };
  
  const payloadStr = JSON.stringify(dataToEncode);
  const signature = createSignature(payloadStr);
  
  // Base64 encode the payload to make URL params cleaner
  const encodedPayload = Buffer.from(payloadStr).toString("base64url");
  
  return `${encodedPayload}.${signature}`;
}

/**
 * Verifies a secure token and returns the parsed payload if valid
 */
export function verifySecureToken(token: string): TokenPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    
    const [encodedPayload, providedSignature] = parts;
    
    // Decode the payload
    const payloadStr = Buffer.from(encodedPayload, "base64url").toString("utf-8");
    const parsedData = JSON.parse(payloadStr);
    
    if (!parsedData.bookingId || (parsedData.action !== "confirm" && parsedData.action !== "reject") || !parsedData.expiryTimestamp) {
      return null;
    }
    
    // Check expiration
    if (Date.now() > parsedData.expiryTimestamp) {
      console.warn(`[Security] Token expired for booking ${parsedData.bookingId}`);
      return null;
    }
    
    // Constant time comparison to prevent timing attacks
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
    if (error instanceof Error && error.message !== "Input length must be a multiple of 16 when decoding with a block cipher") {
        console.error("[Security] Error verifying secure token:", error);
    }
    return null;
  }
}
