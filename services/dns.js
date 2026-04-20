import dns from "dns/promises";

export async function lookupDNS(domain) {
  try {
    const [a, mx, ns] = await Promise.all([
      dns.resolve4(domain),
      dns.resolveMx(domain),
      dns.resolveNs(domain)
    ]);

    return { A: a, MX: mx, NS: ns };
  } catch (err) {
    return { error: "DNS lookup failed" };
  }
}
