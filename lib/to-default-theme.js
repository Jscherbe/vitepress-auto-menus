/**
 * Converts page tree for use in default theme
 * - items end up as sidebar items
 * - Top level pages becom navbar items
 */
export function toDefaultTheme(tree) {
  const nav = tree.map(item => {
    // Remove md extension, and for directories point to index
    const link = item.link.replace(/\/$/, "/index").replace(/\.md$/, "");
    const config = { ...item, link };
    // Add the directory path as a match for possible children
    if (item.link.endsWith("/")) {
      config.activeMatch = item.link;
    }
    delete config.items;
    return config;
  });
  const sidebar = tree.reduce((acc, item) => {
    const { text, items } = item;
    if (item?.items?.length) {
      acc[item.link] = [{ text, items }];
    }
    return acc;
  }, {});
  return { nav, sidebar };
}