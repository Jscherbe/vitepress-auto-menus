# Vitepress Auto Menus

This plugin creates a page tree, used to automatically populate navigation in default theme. You pass it the source directory (docs directory), and it gives you back a tree. It then provides a function to map the tree to the default theme (what the config needs).

Children are mapped to the sidebar, if you want different menu structure for the nav or sidebar, create it using from the output of `createTree`. 

## Usage

```js
import { defineConfig } from 'vitepress';
import { resolve } from "path";
import { createTree, toDefaultTheme } from "@ulu/vitepress-auto-menus";

const pages = createTree({ source: resolve(__dirname, "../") });

export default defineConfig({
  title: "Test Plugin",
  description: "Vitepress site for testing plugin",
  themeConfig: {
    ...toDefaultTheme(pages),
  }
})
```