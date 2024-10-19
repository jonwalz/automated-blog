import { fetchGoogleTrendsData } from "../utils/googleTrends";
import { browseArticle } from "../utils/articleBrowser";
import {
  generateBlogWithClaude,
  generateTitleWithClaude,
} from "../utils/claudeAPI";
import * as fs from "node:fs";
import { Article } from "../types/google-trends";
import { postBlogToGhost } from "../utils/postBlog";

export async function runAutomationFlow() {
  try {
    // Step 1: Fetch Google Trends data
    const trendsData = await fetchGoogleTrendsData();

    const processedData = [];
    for (const dailySearch of trendsData.daily_searches) {
      const results = [];
      const searches = dailySearch.searches.map((search) => [
        search.articles,
        search.query,
      ]);

      console.log("Start browser");
      for (const [articles, query] of searches) {
        for (const article of articles) {
          const content = await browseArticle(article.link as string);
          results.push({
            article: article,
            content: content,
            searchTopic: query,
          });
        }
      }

      console.log("End browser");

      processedData.push(results);

      // save results to file after each daily search is processed
    }

    const transformedData = processedData[0].reduce((acc, article) => {
      return {
        // @ts-ignore
        [article.searchTopic]: [...(acc[article.searchTopic] || []), article],
      };
    }, {});

    fs.writeFileSync("results.json", JSON.stringify(transformedData, null, 2));

    // read results from file
    const processedDataFile = JSON.parse(
      fs.readFileSync("results.json", "utf8")
    ) as Article[];

    // Step 4: Generate blog sections with Claude
    for (const topic in processedDataFile) {
      const data = processedDataFile[topic];
      const blogSection = await generateBlogWithClaude(data, topic);
      fs.writeFileSync("blogSection.md", blogSection);
    }

    // // Step 5: Post to Ghost
    const blog = fs.readFileSync("blogSection.md", "utf8");
    const title = await generateTitleWithClaude(blog);
    await postBlogToGhost(blog, title);

    return "Automation flow completed successfully";
  } catch (error) {
    console.error("Error in automation flow:", error);
    return "Error occurred during automation flow";
  }
}
