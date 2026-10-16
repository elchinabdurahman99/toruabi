const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all files with lucide-react imports
const output = execSync('grep -r "import {.*} from \\"lucide-react\\"" . --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git').toString();
const files = [...new Set(output.split('\n').filter(Boolean).map(line => line.split(':')[0]))];

files.forEach(file => {
  if (file.endsWith('.d.ts')) return;
  console.log(`Processing ${file}...`);
  let content = fs.readFileSync(file, 'utf8');
  
  const regex = /import\s+\{\s*([^}]+)\s*\}\s+from\s+"lucide-react";?/g;
  
  content = content.replace(regex, (match, p1) => {
    const icons = p1.split(',').map(s => s.trim()).filter(Boolean);
    return icons.map(icon => {
      // Convert CamelCase to kebab-case (e.g. ArrowUpRight -> arrow-up-right)
      // Special case for Lucide names: CheckCircle2 -> check-circle-2
      const kebab = icon
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Za-z])([0-9])/g, '$1-$2')
        .toLowerCase();
      return `import ${icon} from "lucide-react/dist/esm/icons/${kebab}";`;
    }).join('\n');
  });
  
  fs.writeFileSync(file, content);
});
