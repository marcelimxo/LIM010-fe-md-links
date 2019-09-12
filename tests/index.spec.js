import {
  readPath, transformPath, readPathExt, pathFiles,
} from '../lib/api/main';

const userPath = 'tests/data/prueba.md';
const badPath = 'tests/none.txt';
const absolutePath = '/home/laboratoria/Desktop/LIM010-fe-md-links/tests/data/prueba.md';
const dirPath = '/home/laboratoria/Desktop/LIM010-fe-md-links/tests/data';

describe('readPath ', () => {
  it('should be a path prueba.md', () => {
    expect(readPath(userPath)).toBe(true);
  });

  it('should not be a path (none.txt) because it does not exist', () => {
    expect(readPath(badPath)).toBe(false);
  });

  it('should not be a path because is a string', () => {
    expect(readPath('no soy un path')).toBe(false);
  });
});


describe('transformPath', () => {
  it('should be a absolute path', () => {
    expect(transformPath(userPath)).toBe(absolutePath);
  });

  it('should be the same path', () => {
    expect(transformPath(absolutePath)).toBe(absolutePath);
  });
});

describe('readPathExt', () => {
  it('should be .md', () => {
    expect(readPathExt(userPath)).toBe(true);
  });

  it('should be a .txt', () => {
    expect(readPathExt(badPath)).toBe(false);
  });
});

describe('pathFiles', () => {
  it('should return an array with the files inside a directory', () => {
    expect(Array.isArray(pathFiles(dirPath))).toBe(true);
  });

  it('should return an array with the file', () => {
    expect(Array.isArray(pathFiles(userPath))).toBe(true);
  });

  it('should return an array with the file name', () => {
    expect(pathFiles(userPath)).toEqual([userPath]);
  });
});
