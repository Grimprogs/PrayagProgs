/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

function walk(dir) {
  let res = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      if (item !== 'node_modules' && item !== '.next') {
        res = res.concat(walk(full));
      }
    } else if (full.endsWith('.tsx') || full.endsWith('.ts')) {
      res.push(full);
    }
  }
  return res;
}

const files = walk('pragyaaprop/src');
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('href=') && (l.includes('prop') || l.includes('slug'))) {
      console.log(`${file}:${i+1} : ${l.trim()}`);
    }
  });
}
