import axios from "axios";
import { handleAxiosError } from "./axiosErrorHandler";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY, // defaults to process.env["ANTHROPIC_API_KEY"]
});

export async function generateBlogWithClaude(data: any, topic: string) {
  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 8192,
    messages: [
      {
        role: "assistant",
        content: `**You are an experienced content writer with expertise in Markdown formatting. Your task is to transform the provided Claude output into a well-structured, engaging section of a blog post in Markdown format. This section will focus on a deep dive into one of the top trending topics. Follow these detailed steps:**

1. **Adopt the Role of a Trend Analyst**: Write from the perspective of an insightful trend analyst, providing valuable context and in-depth commentary on the specific trend.

2. **Create a Compelling Subheading**: Develop a subheading that effectively captures the essence of the specific trend being analyzed, ensuring it is both attention-grabbing and informative.

3. **Deep Dive into the Trend**:
   - Provide *in-depth analysis and commentary*, explaining the possible reasons behind the trend, its broader implications, and how it connects to wider social, cultural, or industry movements.
   - Use specific data points, anecdotes, or examples to elaborate on the trend, making it relatable and engaging for readers.
   - Aim for a length of **300-500 words** to provide substantial depth and context for this specific trend.

4. **Organize Content with Clear Structure**:
   - Use Markdown subheaders (e.g., '###', '####') to divide the section into distinct subsections if necessary.
   - Clearly label each subsection to enhance navigation and structure.

5. **Transform Lists into Engaging Paragraphs**:
   - Rewrite bullet points and lists into *detailed*, well-crafted paragraphs.
   - Expand on each point, providing additional context, examples, and implications of the trend to add depth and interest. Aim for 3-5 sentences per paragraph to ensure thorough coverage.

6. **Use Markdown Effectively for Readability**:
   - **Bold** key terms or phrases to draw attention.
   - *Italicize* for emphasis where needed.
   - Use blockquotes ('>') to highlight significant insights or notable statements.
   - Incorporate ordered ('1.') and unordered lists ('-') where appropriate to enhance clarity, but ensure that these lists are elaborated on in subsequent paragraphs.

7. **Tone and Style**:
   - Ensure the tone remains informative, engaging, and accessible to a general audience interested in current trends.
   - Use conversational phrases or rhetorical questions to maintain an engaging style and encourage readers to reflect on the trend.

8. **Format and Deliver in Markdown**:
   - Provide the final response as a Markdown-formatted section of a blog post, beginning directly with the content.

**Use these detailed instructions to convert the provided Claude output into a polished, Markdown-formatted section of a blog post focusing on one specific trend. Start your response with the Markdown content of the blog post section.**`,
      },
      { role: "user", content: `topic: ${topic}, ${JSON.stringify(data)}` },
    ],
  });

  return msg.content[0].type === "text" ? msg.content[0].text : "";
}

export async function generateTitleWithClaude(data: any) {
  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 8192,
    messages: [
      {
        role: "assistant",
        content:
          "You are an expert at creating engaging and compelling blog titles. Using the user's provided blog content, generate a concise and captivating title that draws readers in, effectively conveys the main idea, and sparks curiosity. The title should be no more than 10 words, use strong and vivid language, and be designed to attract the intended audience. Only respond with the title and no other commentary.",
      },
      { role: "user", content: `data: ${JSON.stringify(data)}` },
    ],
  });

  console.log("MSG: ", JSON.stringify(msg, null, 2));

  return msg?.content[0]?.type === "text" ? msg.content[0].text : "";
}
