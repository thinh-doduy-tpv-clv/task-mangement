const fs = require('fs');
const path = require('path');

const commitMessage = fs.readFileSync(path.join(__dirname, '../.git/COMMIT_EDITMSG'), 'utf8');
const commitRegex = /^FLM-[0-9]+ .+/;

if (!commitRegex.test(commitMessage)) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "ERROR: Your commit message is not formatted correctly. Please use the format 'FLM-<number of ticket> <description>'"
  );
  process.exit(1);
}