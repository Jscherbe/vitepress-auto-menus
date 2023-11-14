import { defineConfig } from 'vitepress';
import { resolve } from "path";
import { createTree, toDefaultTheme } from "../../index.js";

const pages = createTree({ source: resolve(__dirname, "../") });

export default defineConfig({
  title: "Test Plugin",
  description: "Vitepress site for testing plugin",
  themeConfig: {
    ...toDefaultTheme(pages),
  }
})
