# Publisher

[![npm version](https://badge.fury.io/js/%40kev_nz%2Fpublisher.svg)](https://badge.fury.io/js/%40kev_nz%2Fpublisher)

Publish your readme to gh-pages.

## Usage

```bash
npm install @kev_nz/publisher --save-dev
```

Then run

```bash
npx publisher
```

## Custom config

To use custom  html create a folder called `.assets` in the root of your project and
add a `head.html` file with all the content before the readme contents, and a `foot.html`
in the `.assets` folder for all content after the readme contents. The code highlighting uses
[Highlightjs](https://highlightjs.org/) for styles.

Additonally, anything else placed in the `.assets` folder will be copied to the dist folder and published along with readme file.

### Setup

The structure

```
- .assets
-- head.html
-- foot.html
-- extends.css
-- myimage.jpg
- readme.md
```

The published `dist` folder content

```
- index.html
- styles.css
- extends.css
- myimage.jpg
```
