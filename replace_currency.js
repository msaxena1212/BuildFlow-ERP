const fs = require('fs');
const path = require('path');

const targetDirs = [
  'c:/Users/hp/Downloads/stitch_buildflow_project_requirements/frontend/src/app',
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (stat.isFile() && (fullPath.endsWith('.html') || fullPath.endsWith('.ts'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('$') || content.includes('£')) {
          // Replace patterns like $10, $5.5M, £10
          let newContent = content.replace(/\$([0-9]+)/g, '₹$1')
                                  .replace(/£([0-9]+)/g, '₹$1');
          if (newContent !== content) {
            fs.writeFileSync(fullPath, newContent, 'utf8');
            console.log('Updated', fullPath);
          }
      }
    }
  }
}

targetDirs.forEach(processDir);
console.log('Currency replacement complete.');
