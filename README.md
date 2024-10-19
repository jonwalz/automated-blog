# AI Automation Experiment

This project implements an AI-powered automation flow that fetches trending topics, analyzes them, generates a blog post, and publishes it to a Ghost blog.

## Prerequisites

- Node.js (v14 or later)
- Bun (latest version)

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/your-username/ai-automation-flow.git
   cd ai-automation-flow
   ```

2. Install dependencies:

   ```
   bun install
   ```

3. Set up environment variables:
   Copy the `.env.example` file to `.env` and fill in your API keys:
   ```
   cp .env.example .env
   ```
   Then edit the `.env` file and add your actual API keys:
   ```
   SERPAPI_API_KEY=your_serpapi_api_key_here
   PERPLEXITY_API_KEY=your_perplexity_api_key_here
   CLAUDE_API_KEY=your_claude_api_key_here
   GHOST_ADMIN_API_KEY=your_ghost_admin_api_key_here
   ```

## Running the Application

To start the server in development mode:

```
bun run dev
```

To build

```
bun run build
```

The server will start on `http://localhost:3000`.

## API Endpoints

- `GET /run`: Triggers the AI automation flow

## Project Structure

- `src/index.ts`: Main application file containing the automation flow logic
- `src/ghost-admin-api.d.ts`: Type definitions for the Ghost Admin API
- `.env`: Environment variables (API keys)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
