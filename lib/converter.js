import fs from 'fs';
import path from 'path';
import fm from 'front-matter';
import MarkdownIt from "markdown-it";
import { convert as toPlainText } from "html-to-text";

const md = new MarkdownIt(); // For extracting titles

export default function converter(tree, options) {
  const { indexFiles, base, source, titleFallback } = options;
  const convert = item => {
    // Index pages are omitted as they are represented by the directory items
    if (indexFiles.includes(item.name)) {
      return;
    }
  
    let contentPath = item.path;
  
    if (item.children) {
      let indexPage = item.children.find(c => indexFiles.includes(c.name));
      if (indexPage) {
        contentPath = indexPage.path;
      } else {
        console.error("Missing index page for: ", item.path);
        return;
      }
    }
  
    const content = fs.readFileSync(contentPath).toString();
    const frontmatter = fm(content)?.attributes;
    let text = frontmatter?.title;
    // Temp solution to extract title from Markdown H1
    if (!text) {
      let match = content.match(/^#\s{1,3}.+$/m);
      if (match) {
        text = match[0].replace(/^#\s+/, "");
        text = md.renderInline(text);
        text = toPlainText(text);
      } else {
        text = titleFallback;
      }
    }
    let link = "/" + path.relative(base || source, item.path);
    if (item.children) {
      link += "/";
    }
    const page = { 
      text, 
      link, 
      frontmatter,
      meta: { ...item }
    };
    if (item.children) {
      // Note changing the key to items to match vitepress
      page.items = item.children.map(convert).filter(Boolean);
      if (!page.items.length) {
        delete page.children;
      }
    }
    return page;
  }
  
  const newTree = tree.children.map(convert).filter(Boolean);
  cleanup(newTree, options)
  return newTree;
}


/**
 * Applies sort function through all groups
 */
function cleanup(tree, options) {
  tree.sort(options.sort);
  tree.forEach(page => {
    const { items } = page;
    if (items?.length) {
      cleanup(items, options);
    }
    if (!options.keepFrontmatter) {
      delete page.frontmatter;
    }
    if (!options.keepMeta) {
      delete page.meta;
    }
  });
}
