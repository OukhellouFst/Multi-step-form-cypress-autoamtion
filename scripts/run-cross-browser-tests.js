const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const { browsers, featureDir, reportDir } = config;

// Ensure the report directory exists
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

// Function to run a command
function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { shell: true });

    process.stdout.on('data', data => console.log(data.toString()));
    process.stderr.on('data', data => console.error(data.toString()));

    process.on('close', code => {
      code === 0 ? resolve() : reject(new Error(`Command failed with exit code ${code}`));
    });
  });
}

// Run tests and generate report
async function runTests() {
  for (const browser of browsers) {
    console.log(`Running tests in ${browser}...`);
    
    const args = [
      'run',
      '--browser', browser,
      '--spec', `"${featureDir}/*.feature"`,
      '--env', 'allure=true'
    ];
    
    try {
      await runCommand('npx', ['cypress', ...args]);
    } catch (error) {
      console.error(`Failed to run tests in ${browser}: ${error.message}`);
    }
  }
  
  console.log('Generating Allure report...');
  try {
    await runCommand('npx', ['allure', 'generate', reportDir, '--clean']);
    console.log(`Allure report generated at ${path.join(reportDir, 'allure-report')}`);
  } catch (error) {
    console.error('Error generating Allure report:', error.message);
  }
}

runTests();
