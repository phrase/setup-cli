const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const cp = require('node:child_process');
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
    const osPlat = os.platform();
    const osArch = os.arch();
    const version = core.getInput('version');
    const cacheToolPath = tc.find(phrase, version)

    if (cacheToolPath && cacheToolPath !== '') {
      core.addPath(cacheToolPath);
      return;
    }

    const fileName = isWindows(osPlat)
      ? `phrase_${osMapper[osPlat]}_${archMapper[osArch]}.exe`
      : `phrase_${osMapper[osPlat]}_${archMapper[osArch]}`

    const downloadUrl = `https://github.com/phrase/phrase-cli/releases/download/${version}/${fileName}`;
    const downloadPath = await tc.downloadTool(downloadUrl);
    const toolPath = await tc.cacheFile(downloadPath, phrase, phrase, version, osArch);

    core.addPath(toolPath);

    if (!isWindows(osPlat)) {
      cp.exec(`chmod +x ${toolPath}/${phrase}`)
    }
    core.setOutput(toolPath);
  } catch (error) {
    core.setFailed(error);
  }
}

run();
