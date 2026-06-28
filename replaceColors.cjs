const fs = require('fs');
const path = require('path');

const replacements = {
  '#4f46e5': '#0E61F3',
  '#4F46E5': '#0E61F3',
  '#eef0fe': '#EAF2FF',
  '#EEF0FE': '#EAF2FF',
  '#818cf8': '#60A5FA',
  '#818CF8': '#60A5FA',
  '#c7d2fe': '#C9DBFF',
  '#C7D2FE': '#C9DBFF',
  '#6366f1': '#0A54DB',
  '#6366F1': '#0A54DB',
  '#4338ca': '#0849C2',
  '#4338CA': '#0849C2',
};

const dirsToScan = [
  path.join(__dirname, 'src', 'components', 'campaigns'),
  path.join(__dirname, 'src', 'pages'),
  path.join(__dirname, 'src', 'lib')
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
      // Exclude Landing.css and Landing.tsx to ensure the landing page is not modified!
      if (file === 'Landing.css' || file === 'Landing.tsx' || file === 'VisitorHome.tsx' || file === 'App.css') continue;
      
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [oldC, newC] of Object.entries(replacements)) {
        if (content.includes(oldC)) {
          content = content.split(oldC).join(newC);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated:', fullPath);
      }
    }
  }
}

dirsToScan.forEach(processDir);
console.log('Done replacing colors!');
