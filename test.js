import { createTree, toDefaultTheme} from "./index.js";
import { writeFileSync } from "fs";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const tree = createTree({ 
  source: join(__dirname, "test/") 
});

const outputTree = join(__dirname, "logs/test-tree.json");
const outputConfig = join(__dirname, "logs/test-theme-config.json");
const themeConfig = toDefaultTheme(tree);

writeFileSync(outputTree, JSON.stringify(tree, null, 2));
writeFileSync(outputConfig, JSON.stringify(themeConfig, null, 2));

