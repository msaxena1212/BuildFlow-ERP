const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else {
      if (['.ts', '.html', '.css', '.json'].includes(path.extname(fullPath))) {
        let content = fs.readFileSync(fullPath, 'utf8');
        const originalContent = content;
        content = content.replace(/Build[Ff]low/g, 'ZYNO');
        if (content !== originalContent) {
          fs.writeFileSync(fullPath, content);
          console.log(`Replaced in ${fullPath}`);
        }
      }
    }
  }
}

replaceInDir(path.join(__dirname, 'frontend/src'));
replaceInDir(path.join(__dirname, 'backend/src'));
