const proc = require('child_process');

// This function takes in a string and returns a promise that resolves to a translated string
// You have use async/await to make this function work.
function translateText(text) {
  return new Promise((resolve, reject) => {
    const command = 'python3';
    const scriptPath = './src/utils/translate_script.py';
    const args = [scriptPath, text];

    const child = proc.spawn(command, args);

    let output = '';
    let error = '';

    child.stdout.on('data', (data) => {
      output += data;
    });

    child.stderr.on('data', (data) => {
      error += data;
    });

    child.on('close', (code) => {
      if (code !== 0) {
        console.error(`child process exited with code ${code}`);
        console.error(`Error output: ${error}`);
        reject(new Error('Server error'));
      }

      resolve(output);
    });

    child.on('error', (err) => {
      console.error('Error running Python script:', err);
      reject(err);
    });
  });
}

module.exports = translateText;