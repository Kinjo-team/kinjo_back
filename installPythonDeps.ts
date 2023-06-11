const proc = require('child_process');

// Install Python dependencies *DO NOT TOUCH THIS*
proc.exec('pip3 install -r requirements.txt', (error : any, stdout : any, stderr : any) => {
    if (error) {
      console.error(`Failed to install Python dependencies: ${error.message}`);
      return;
    }
    console.log('Python dependencies installed successfully.');
  });