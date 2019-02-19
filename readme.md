# Publisher

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
in the `.assets` folder for all content after the readme contents.

