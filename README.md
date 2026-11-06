# MOOST multilingual research website / MOOST 多语言科研主页

## Public website / 公开访问

https://liudan518.github.io/MOOST/

GitHub Pages deployment source: `main`, `/ (root)`. Updates pushed to `main` are published automatically after Pages is enabled.

GitHub Pages 部署源：`main` 分支，`/ (root)` 根目录。开启 Pages 后，提交到 `main` 的更新将自动发布。

## Quick start / 快速使用

Open `index.html` directly in a modern browser. No backend, installation, CDN, or network requests are required for the layout, language switching, images, tables, and full-screen figure preview. The DOI and publisher buttons open external websites when an internet connection is available.

直接双击 `index.html`，即可离线浏览。页面无需安装依赖，支持英语、中文、俄语、法语、阿拉伯语，选择的语言会保存在浏览器本地。阿拉伯语自动切换为 RTL（从右向左）阅读方向。

## Files / 文件说明
- `index.html`: semantic content, figures, experimental tables, citations.
- `assets/site.css`: responsive visual system and RTL styles.
- `assets/site.js`: language selection, figures, BibTeX copy.
- `assets/i18n.js`: Russian, French, Arabic translation entries, plus UI strings for five languages.
- `images/`: six original figure files from the supplied site.

## Publishing / 部署
Upload all files and folders to a static host such as GitHub Pages, Cloudflare Pages, or a regular web server. Keep relative paths unchanged. `index.html` is the entry point.

## Content scope / 内容提示
The website retains manuscript numbers, figures and study claims from the supplied archive. Translations for the three additional languages are editorial translations (not publisher-approved). For public deployment, validate wording and numeric comparisons against the final published article and confirm permission to display the journal figures. This package does not publish any original engine data or model source code.

## Preview / 效果截图

The `previews/` folder includes representative screenshots of the English/Arabic desktop and Chinese/Arabic mobile layouts. The screenshots are for inspection only; the live site remains fully interactive.
