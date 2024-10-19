import puppeteer from "puppeteer";

/**
 * Browse an article using puppeteer and return the content as a string
 * @param url - The URL of the article to browse
 * @returns The content of the article as a string
 */
export async function browseArticle(url: string): Promise<string> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle0" });
    console.log("Page loaded");

    // Extract the main content of the article
    // This selector might need to be adjusted based on the structure of the articles you're scraping
    const content = await page.evaluate(() => {
      const articleElement = document.querySelector("article") || document.body;
      console.log(articleElement);
      return articleElement.innerText;
    });

    console.log("content", content);
    await browser.close();
    return content;
  } catch (error) {
    console.error(`Error browsing article at ${url}:`, error);
    await browser.close();
    return "";
  }
}
