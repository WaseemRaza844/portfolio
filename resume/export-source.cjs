// Export trusted, local portfolio scripts. No network requests or npm dependencies.
// Run through build.py; output is JSON on stdout.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({window: {PORTFOLIO_DATA: {}}, console: {log() {}}});
for (const name of ['profile-data', 'certifications', 'projects', 'publications']) {
  const filename = path.join(root, 'dist', 'data', name + '.js');
  vm.runInContext(fs.readFileSync(filename, 'utf8'), context, {filename, timeout: 3000});
}
const data = context.window.PORTFOLIO_DATA;
process.stdout.write(JSON.stringify({
  identity: context.window.PROFILE_DATA.shared,
  websiteVariants: context.window.PROFILE_DATA.variants,
  certifications: data.certifications,
  projects: data.projects,
  publications: data.publications
}, null, 2));
