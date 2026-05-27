import fs from 'fs';
import path from 'path';

const distClientPath = 'dist/client';

// Find main CSS and JS files in assets
const assetsPath = path.join(distClientPath, 'assets');
let mainCss = '';
let mainJs = '';

if (fs.existsSync(assetsPath)) {
  const files = fs.readdirSync(assetsPath);
  
  // Find the main CSS file (typically the largest one with style pattern)
  const cssFiles = files.filter(f => f.endsWith('.css') && f.includes('index') || f.includes('styles'));
  if (cssFiles.length > 0) {
    mainCss = cssFiles[0];
  } else if (files.some(f => f.endsWith('.css'))) {
    mainCss = files.find(f => f.endsWith('.css'));
  }
  
  // Find the main JS file (typically the largest one with index pattern)
  const jsFiles = files.filter(f => f.endsWith('.js') && f.includes('index'));
  if (jsFiles.length > 0) {
    mainJs = jsFiles[jsFiles.length - 1]; // Get the last index file (usually the main one)
  } else {
    // Fallback: get the largest JS file
    const allJs = files.filter(f => f.endsWith('.js'));
    if (allJs.length > 0) {
      mainJs = allJs.reduce((prev, current) => {
        const prevSize = fs.statSync(path.join(assetsPath, prev)).size;
        const currentSize = fs.statSync(path.join(assetsPath, current)).size;
        return currentSize > prevSize ? current : prev;
      });
    }
  }
}

// Generate HTML
const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rudra Banna Taxi</title>
    ${mainCss ? `<link rel="stylesheet" crossorigin href="/assets/${mainCss}">` : ''}
  </head>
  <body>
    <div id="root"></div>
    ${mainJs ? `<script type="module" crossorigin src="/assets/${mainJs}"></script>` : ''}
  </body>
</html>`;

// Write index.html
const indexPath = path.join(distClientPath, 'index.html');
fs.writeFileSync(indexPath, html);
console.log(`✓ Generated ${indexPath}`);

// Patch client JS assets to avoid hydration errors when server HTML is not present.
try {
  const jsFiles = fs.readdirSync(assetsPath).filter((f) => f.endsWith('.js'));
  for (const file of jsFiles) {
    const filePath = path.join(assetsPath, file);
    let js = fs.readFileSync(filePath, 'utf8');
    let newJs = js.replace(/(\w+)\.hydrateRoot\(document,/g, "$1.createRoot(document.getElementById('root')).render(");
    // Ensure router basepath is '/' to match Vercel root deployment
    newJs = newJs.replace(/t\.update\(\{basepath:""/g, 't.update({basepath:"/"');
    if (newJs !== js) {
      fs.writeFileSync(filePath, newJs);
      console.log(`✓ Patched ${filePath} to use client render`);
    }
  }
} catch (err) {
  console.warn('Could not patch client JS files for hydrate -> render:', err.message || err);
}
