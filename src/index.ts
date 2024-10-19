import { Hono } from "hono";
import { runAutomationFlow } from "./api/automationFlow";
import "./config/env"; // This will load and validate environment variables
import { generateBlogWithClaude } from "./utils/claudeAPI";
import * as fs from "node:fs";
import { Article } from "./types/google-trends";
import { postBlogToGhost } from "./utils/postBlog";

const app = new Hono();

// Endpoint to trigger the automation
app.get("/run", async (c) => {
  const result = await runAutomationFlow();
  return c.text(result);
});

app.get("/blog", async (c) => {
  const processedDataFile = JSON.parse(
    fs.readFileSync("processedData.json", "utf8")
  ) as Article[];

  // Step 4: Generate blog with Claude
  for (const topic in processedDataFile) {
    const data = processedDataFile[topic];
    const blogSection = await generateBlogWithClaude(data, topic);
    fs.appendFileSync("blogSection.md", blogSection);
  }

  const blog = fs.readFileSync("blogSection.md", "utf8");
  fs.writeFileSync("blog.md", blog);

  return c.text("Blog generated");
});

app.get("/postBlog", async (c) => {
  const blog = fs.readFileSync("blog.md", "utf8");
  const title = await generateBlogWithClaude(
    blog,
    "generate a title for the blog"
  );

  await postBlogToGhost(blog, title);

  return c.text("Success");
});

app.get("/processData", (c) => {
  const content = fs.readFileSync("results.json", "utf8");
  const processedData = JSON.parse(content) as Record<string, Article[]>;
  const transformedData = processedData[0].reduce((acc, article) => {
    return {
      ...acc,
      // @ts-ignore
      [article.searchTopic]: [...(acc[article.searchTopic] || []), article],
    };
  }, {});

  fs.writeFileSync(
    "processedData.json",
    JSON.stringify(transformedData, null, 2)
  );

  return c.text("Processed data saved");
});

app.get("/", (c) => {
  return c.text("AI Automation Flow Server");
});

export default app;
