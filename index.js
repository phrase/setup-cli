const core = require('@actions/core');
const toolCache = require('@actions/tool-cache');
const childProcess = require('node:child_process');
const os = require('node:os');

const osMapper = {
  win32: 'windows',
  darwin: 'macosx',
  linux: 'linux',
}

function isWindows(osPlatform) {
  return osPlatform === 'win32'
}

const archMapper = {
  x32: '386',
  x64: 'amd64',
  arm64: 'arm64'
}

async function run() {
  try {
    const phrase = 'phrase'
    const osPlatform = os.platform();
    const osArch = os.arch();
    const version = core.getInput('version');
    const cacheToolPath = toolCache.find(phrase, version)

    if (cacheToolPath && cacheToolPath !== '') {
      core.addPath(cacheToolPath);
      return;
    }

    const fileName = isWindows(osPlatform)
      ? `phrase_${osMapper[osPlatform]}_${archMapper[osArch]}.exe`
      : `phrase_${osMapper[osPlatform]}_${archMapper[osArch]}`

    const downloadUrl = `https://github.com/phrase/phrase-cli/releases/download/${version}/${fileName}`;
    const downloadPath = await toolCache.downloadTool(downloadUrl);
    const toolPath = await toolCache.cacheFile(downloadPath, phrase, phrase, version, osArch);

    core.addPath(toolPath);

    if (!isWindows(osPlatform)) {
      childProcess.exec(`chmod +x ${toolPath}/${phrase}`)
    }
    core.setOutput(toolPath);
  } catch (error) {
    core.setFailed(error);
  }
}

run();
