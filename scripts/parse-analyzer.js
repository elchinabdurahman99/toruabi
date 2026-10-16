const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), '.next/analyze/client.html');
if (!fs.existsSync(filePath)) {
  console.error('Report not found');
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');
const match = content.match(/chartData\s*=\s*(\[.+?\]);/);
if (!match) {
  console.error('Data not found in report');
  process.exit(1);
}

try {
  const data = JSON.parse(match[1]);
  const modules = [];

  function walk(node) {
    if (node.groups) {
      node.groups.forEach(walk);
    } else {
      modules.push({
        label: node.label,
        path: node.path || node.label,
        size: node.statSize,
        parsed: node.parsedSize,
        gzip: node.gzipSize
      });
    }
  }

  data.forEach(walk);

  modules.sort((a, b) => b.size - a.size);

  console.log('Top 20 largest modules (by statSize):');
  modules.slice(0, 20).forEach(m => {
    console.log(`${(m.size / 1024).toFixed(2)} KB - ${m.path}`);
  });
} catch (e) {
  console.error('Error parsing data:', e);
}
