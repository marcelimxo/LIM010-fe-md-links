import {
  pathExist, transformPath, pathIsMarkdown, pathFiles,
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
  it('should be a absolute path', () => {
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
    expect(pathFiles(directoryPath)).toEqual([absolutePathFile]);
  });

  it('should return an array with the file name', () => {
    expect(Array.isArray(pathFiles(relativePathFile))).toBe(true);
    expect(pathFiles(relativePathFile)).toEqual([relativePathFile]);
  });
});
