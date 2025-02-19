import md5 from "md5";

/**
 * Generate a secure hash for API requests using multiple API keys.
 * @param {Object} keys - API keys object (private/public).
 * @returns {Object} { ts, hashes }
 */
export const generateHashes = (keys) => {
  const ts = new Date().getTime();
  const hashes = {};

  Object.entries(keys).forEach(([service, { privateKey, publicKey }]) => {
    if (privateKey || publicKey) {  // ✅ Allow hashing even if one key exists
      hashes[service] = {
        hash: md5(ts + (privateKey || "") + (publicKey || "")), // ✅ Handle missing keys safely
        ts,
        publicKey: publicKey || "" // ✅ Ensure publicKey is always a string
      };
    } else {
      console.warn(`Skipping ${service}: Missing API keys`);
    }
  });

  return hashes;
};
