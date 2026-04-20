import dns from "dns/promises";

export async function getIP(domain) {
  try {
    const result = await dns.lookup(domain);
    return result.address;
  } catch {
    return null;
  }
}
