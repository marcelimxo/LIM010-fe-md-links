import {
  pathExist, transformPath, pathIsMarkdown, pathFiles, linksFromFile,
} from '../lib/api/main';

const relativePathFile = 'tests/data/prueba.md';
const badPath = 'tests/none.txt';
const absolutePathFile = '/home/laboratoria/Desktop/LIM010-fe-md-links/tests/data/prueba.md';
const directoryPath = '/home/laboratoria/Desktop/LIM010-fe-md-links/tests/data';

describe('pathExist ', () => {
  it('should return true because path (prueba.md) exists', () => {
    expect(pathExist(relativePathFile)).toBe(true);
  });

  it('should return false because path (none.txt) does not exist', () => {
    expect(pathExist(badPath)).toBe(false);
  });

  it('should return false because is a string', () => {
    expect(pathExist('not a path')).toBe(false);
  });
});

describe('transformPath', () => {
  it('should transform to an absolute path', () => {
    expect(transformPath(relativePathFile)).toBe(absolutePathFile);
  });

  it('should be the same path', () => {
    expect(transformPath(absolutePathFile)).toBe(absolutePathFile);
  });
});

describe('pathIsMarkdown', () => {
  it('should be true because is a .md', () => {
    expect(pathIsMarkdown(relativePathFile)).toBe(true);
  });

  it('should be false because is a .txt', () => {
    expect(pathIsMarkdown(badPath)).toBe(false);
  });

  it('should be a false because is not a file', () => {
    expect(pathIsMarkdown(directoryPath)).toBe(false);
  });
});

describe('pathFiles', () => {
  it('should return an array with the absolute paths of the files inside a directory', () => {
    expect(Array.isArray(pathFiles(directoryPath))).toBe(true);
    expect(pathFiles(directoryPath)).toEqual(['/home/laboratoria/Desktop/LIM010-fe-md-links/tests/data/prueba.md',
      '/home/laboratoria/Desktop/LIM010-fe-md-links/tests/data/prueba_sin_links.md']);
  });

  it('should return an array with the file name', () => {
    expect(Array.isArray(pathFiles(relativePathFile))).toBe(true);
    expect(pathFiles(relativePathFile)).toEqual([absolutePathFile]);
  });
});

describe('linksFromFile', () => {
  it('should return an array with the links from the file', () => {
    expect(Array.isArray(linksFromFile(absolutePathFile))).toBe(true);
    expect(linksFromFile(absolutePathFile)).toEqual(['[soy un link](https://google.com)', '[Node.js](https://nodejs.org/en/)']);
  });

  it('should return an empty array because the file does not have any links', () => {
    expect(linksFromFile('/home/laboratoria/Desktop/LIM010-fe-md-links/tests/data/prueba_sin_links.md')).toEqual([]);
  });
});
