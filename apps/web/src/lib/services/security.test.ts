import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { generateSecureToken, verifySecureToken, createSignature } from "./security";
import crypto from "crypto";

describe("Security Service", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    process.env.WEBHOOK_SECRET = "test_secret_key_12345";
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("createSignature", () => {
    it("should generate a consistent HMAC-SHA256 signature", () => {
      const payload = "booking_123:confirm";
      const signature1 = createSignature(payload);
      const signature2 = createSignature(payload);
      
      expect(signature1).toEqual(signature2);
      expect(typeof signature1).toBe("string");
      expect(signature1.length).toBe(64); // SHA-256 hex string is 64 chars
    });

    it("should generate different signatures for different payloads", () => {
      const sig1 = createSignature("booking_123:confirm");
      const sig2 = createSignature("booking_123:reject");
      
      expect(sig1).not.toEqual(sig2);
    });
  });

  describe("generateSecureToken", () => {
    it("should generate a token in the correct format", () => {
      const token = generateSecureToken({ bookingId: "booking_123", action: "confirm" });
      
      // Token should be base64url(payload).signature
      const parts = token.split(".");
      expect(parts.length).toBe(2);
      
      const payload = Buffer.from(parts[0], "base64url").toString("utf-8");
      expect(payload).toContain('"bookingId":"booking_123"');
      expect(payload).toContain('"action":"confirm"');
      
      const expectedSignature = createSignature(payload);
      expect(parts[1]).toBe(expectedSignature);
    });
  });

  describe("verifySecureToken", () => {
    it("should verify a valid confirm token", () => {
      const bookingId = "booking_123";
      const token = generateSecureToken({ bookingId, action: "confirm" });
      
      const result = verifySecureToken(token);
      
      expect(result).not.toBeNull();
      expect(result?.bookingId).toBe(bookingId);
      expect(result?.action).toBe("confirm");
    });

    it("should verify a valid reject token", () => {
      const bookingId = "booking_456";
      const token = generateSecureToken({ bookingId, action: "reject" });
      
      const result = verifySecureToken(token);
      
      expect(result).not.toBeNull();
      expect(result?.bookingId).toBe(bookingId);
      expect(result?.action).toBe("reject");
    });

    it("should return null for an invalid token format", () => {
      const result = verifySecureToken("invalid_token_format");
      expect(result).toBeNull();
    });

    it("should return null for a token with a tampered signature", () => {
      const bookingId = "booking_123";
      const validToken = generateSecureToken({ bookingId, action: "confirm" });
      
      const parts = validToken.split(".");
      // Tamper with the signature
      const tamperedParts = [parts[0], "0000" + parts[1].substring(4)];
      const tamperedToken = tamperedParts.join(".");
      
      const result = verifySecureToken(tamperedToken);
      expect(result).toBeNull();
    });

    it("should return null for a token with a tampered payload", () => {
      const validToken = generateSecureToken({ bookingId: "booking_123", action: "confirm" });
      const parts = validToken.split(".");
      
      // Tamper with the payload (change confirm to reject)
      const tamperedPayload = Buffer.from(JSON.stringify({ bookingId: "booking_123", action: "reject", expiryTimestamp: 9999999999999 })).toString("base64url");
      const tamperedToken = `${tamperedPayload}.${parts[1]}`;
      
      const result = verifySecureToken(tamperedToken);
      expect(result).toBeNull();
    });
    
    it("should return null if the payload format is invalid", () => {
      // Payload without action
      const invalidPayload = JSON.stringify({ bookingId: "123" });
      const signature = createSignature(invalidPayload);
      const encodedPayload = Buffer.from(invalidPayload).toString("base64url");
      
      const token = `${encodedPayload}.${signature}`;
      
      const result = verifySecureToken(token);
      expect(result).toBeNull();
    });
    
    it("should return null if the action is invalid", () => {
      const invalidPayload = JSON.stringify({ bookingId: "123", action: "destroy", expiryTimestamp: 9999999999999 });
      const signature = createSignature(invalidPayload);
      const encodedPayload = Buffer.from(invalidPayload).toString("base64url");
      
      const token = `${encodedPayload}.${signature}`;
      
      const result = verifySecureToken(token);
      expect(result).toBeNull();
    });

    it("should return null for an expired token", () => {
      // Generate a token that expires in -1 days (already expired)
      const expiredToken = generateSecureToken({ bookingId: "booking_123", action: "confirm" }, -1);
      
      const result = verifySecureToken(expiredToken);
      expect(result).toBeNull();
    });
  });
});
