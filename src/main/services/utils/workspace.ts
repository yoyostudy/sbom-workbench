import fs from 'fs';
import path from 'path';

export function isIdentifyFile(file: string) {
  const pattern = /sbom\.json/i;
  const identify = 'scanoss-identify.json';
  const isMatch = pattern.test(file);
  if (isMatch || file === identify) return true;
  return false;
}

export function isIgnoreFile(file: string) {
  const ignore = 'scanoss-ignore.json';
  if (file === ignore) return true;
  return false;
}

export function sortIdentifyFilesComparator(a, b) {
  const identifyFilesCriteria = ['scanoss-identify.json', 'SBOM.json', 'sbom.json'];
  if (identifyFilesCriteria.indexOf(a) < identifyFilesCriteria.indexOf(b)) {
    return -1;
  }
  return 0;
}

export async function getContextFiles(scanRoot: string) {
  const stats = await fs.promises.stat(scanRoot);
  const isDirectory = stats.isDirectory();

  if (!isDirectory) {
    return {
      identifyFile: null,
      ignoreFile: null,
    };
  }

  const files = await fs.promises.readdir(scanRoot);
  const identifyFiles = [];
  const ignoreFiles = [];
  // Test string

  for (let i = 0; i < files.length; i++) {
    if (isIdentifyFile(files[i])) {
      identifyFiles.push(files[i]);
    }
    if (isIgnoreFile(files[i])) {
      ignoreFiles.push(files[i]);
    }
  }

  identifyFiles.sort(sortIdentifyFilesComparator);

  return {
    identifyFile: identifyFiles.length > 0 ? identifyFiles[0] : null,
    ignoreFile: ignoreFiles.length > 0 ? ignoreFiles[0] : null,
  };
}

export async function getScanossSettingsFilePath(scanRoot: string) {
  const stats = await fs.promises.stat(scanRoot);
  const isDirectory = stats.isDirectory();

  if (!isDirectory) return null;

  const files = await fs.promises.readdir(scanRoot);
  if ((files.some((file) => file === 'scanoss.json'))) return 'scanoss.json';
  return null;
}
