export const baseUrl = "https://edwardurban.com";

export default async function sitemap() {
  let routes = ["", "/experience", "/education", "/resume"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
}
