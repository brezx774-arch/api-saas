import crypto from "crypto";

export function generateApiKey() {
  return "sk_live_" + crypto.randomBytes(24).toString("hex");
}
