import {Config} from '../config/env.config';

/**
 * Formats a URL by replacing any origin with the current API_BASE_URL from environment
 *
 * @param url - The full URL to format (e.g., "http://localhost:3000/api/v1/uploads/file.png")
 * @returns The formatted URL with current base URL (e.g., "http://192.168.1.100:3000/api/v1/uploads/file.png")
 *
 * @example
 * ```ts
 * // If API_BASE_URL is "http://192.168.1.100:3000/api/v1"
 * formatURL("http://localhost:3000/api/v1/uploads/file.png")
 * // Returns: "http://192.168.1.100:3000/api/v1/uploads/file.png"
 *
 * formatURL("http://localhost:3000/api/v1/users")
 * // Returns: "http://192.168.1.100:3000/api/v1/users"
 *
 * formatURL("https://example.com/api/v1/auth/login")
 * // Returns: "http://192.168.1.100:3000/api/v1/auth/login"
 * ```
 */
export const formatURL = (url: string): string => {
  if (!url) {
    return url;
  }

  const baseURL = Config.API.BASE_URL;

  // Direct string match - already using correct base URL
  if (url.startsWith(baseURL)) {
    return url;
  }

  // Extract origin using regex (protocol + host + port)
  // Matches: http://localhost:3000 or https://api.example.com:8080
  const originRegex = /^(https?:\/\/[^/]+)/;
  const urlMatch = url.match(originRegex);
  const baseUrlMatch = baseURL.match(originRegex);

  if (urlMatch && baseUrlMatch) {
    // Replace the origin in the URL with the origin from base URL
    const remainingPath = url.substring(urlMatch[1].length);
    return `${baseUrlMatch[1]}${remainingPath}`;
  }

  // If no match found, return the original URL
  return url;
};
