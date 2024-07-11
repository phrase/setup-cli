const process = require('process');
const cp = require('child_process');
const path = require('path');

// shows how the runner will run a javascript action with env / stdout protocol
test('fails when no version supplied', () => {
  const ip = path.join(__dirname, 'index.js');
  try {
    cp.execSync(`node ${ip}`, { env: process.env }).toString();
  } catch (err) {
    expect(err.stdout.toString()).toEqual(
      expect.stringContaining('versionSpec parameter is required'),
    );
  }
});
