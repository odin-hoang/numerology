export default function sitemap() {
  const baseUrl = "https://thansohoconline.vercel.app";
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/cycle`, lastModified: new Date() },
  ];
}
