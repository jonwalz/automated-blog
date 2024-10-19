import * as dotenv from "dotenv";

dotenv.config();

export const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY;
export const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
export const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
export const GHOST_ADMIN_API_KEY = process.env.GHOST_ADMIN_API_KEY;

if (
  !SERPAPI_API_KEY ||
  !PERPLEXITY_API_KEY ||
  !CLAUDE_API_KEY ||
  !GHOST_ADMIN_API_KEY
) {
  throw new Error("Missing required environment variables");
}
