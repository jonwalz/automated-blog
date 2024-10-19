// @ts-ignore
import GhostAdminAPI from "@tryghost/admin-api";
import { marked } from "marked";

export async function postBlogToGhost(blog: string, title: string) {
  const ghost = new GhostAdminAPI({
    url: process.env.GHOST_API_URL!,
    key: process.env.GHOST_ADMIN_API_KEY!,
    version: "v5.0",
  });

  const blogHTML = marked.parse(blog);
  console.log("Blog html: ", blogHTML);

  const post = await ghost.posts.add(
    {
      title: title,
      html: blogHTML,
    },
    { source: "html" }
  );
}
