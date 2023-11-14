export const defaults = {
  source: null,
  base: null,
  parser: null,
  titleFallback: "Missing Title",
  keepFrontmatter: false,
  keepMeta: false,
  indexFiles: [
    "index.md", 
    "index.txt",
    "index.html", 
    "README.md"
  ],
  sort(a, b) {
    const getWeight = p => p.frontmatter.order || p.frontmatter.weight || 0;
    return getWeight(a) - getWeight(b) || a.text.localeCompare(b.text);
  }
};

export const parserDefaults = {
  extensions: /\.(md|html|txt)$/,
  exclude: /\.vitepress$/,
};