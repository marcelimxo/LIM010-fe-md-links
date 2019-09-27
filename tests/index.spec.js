/* eslint-disable no-console */
import fetchMock from 'node-fetch';
import {
  pathExist,
  transformPath,
  pathIsMarkdown,
  pathFiles,
  linksFromFile,
  objLinks,
} from '../lib/api/main';

import cmd from '../lib/cmd';

const chalk = require('chalk');

const {
  blue, red, green, magenta,
} = chalk.bold;

const { underline, italic } = chalk;

const { white, cyan, gray } = chalk;

const emoji = require('node-emoji');

fetchMock
  .mock('http://www.good-test-marcelim.com', 200)
  .mock('http://www.bad-test-marcelim.net', 400)
  .mock('no es una url', () => {
    // eslint-disable-next-line no-throw-literal
    throw 'error';
  });

const relativePathFile = 'tests/data/prueba.md';
const badPath = 'tests/none.txt';
const absolutePathFile = '/home/laboratoria/Desktop/LIM010-fe-md-links/tests/data/prueba.md';
const noLinksPath = '/home/laboratoria/Desktop/LIM010-fe-md-links/tests/data/prueba_sin_links.md';
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
    expect(pathFiles(directoryPath)).toEqual([
      '/home/laboratoria/Desktop/LIM010-fe-md-links/tests/data/prueba.md',
      '/home/laboratoria/Desktop/LIM010-fe-md-links/tests/data/prueba_sin_links.md',
    ]);
  });

  it('should return an array with the file name', () => {
    expect(Array.isArray(pathFiles(relativePathFile))).toBe(true);
    expect(pathFiles(relativePathFile)).toEqual([absolutePathFile]);
  });
});

describe('linksFromFile', () => {
  it('should return an array with the links from the file', () => {
    expect(Array.isArray(linksFromFile(absolutePathFile))).toBe(true);
    expect(linksFromFile(absolutePathFile)).toEqual([
      '[soy un buen link](http://www.good-test-marcelim.com)',
      '[soy un mal link](http://www.bad-test-marcelim.net)',
    ]);
  });

  it('should return an empty array because the file does not have any links', () => {
    expect(
      linksFromFile(noLinksPath),
    ).toEqual([]);
  });
});

describe('objLinks', () => {
  it('should be a function', () => {
    expect(typeof objLinks).toBe('function');
  });

  it('should return an object with link properties', () => objLinks('[soy un buen link](http://www.good-test-marcelim.com)', absolutePathFile).then((links) => {
    expect(links).toEqual({
      href: 'http://www.good-test-marcelim.com',
      text: 'soy un buen link',
      file: '/home/laboratoria/Desktop/LIM010-fe-md-links/tests/data/prueba.md',
    });
  }));

  it('should return an object with link properties and validation should return status 200', () => objLinks('[soy un buen link](http://www.good-test-marcelim.com)', absolutePathFile, { validate: true }).then((links) => {
    expect(links.status).toBe(200);
    expect(links.ok).toBe('OK');
  }));

  it('should return an object with link properties and validation should return status 400', () => objLinks('[soy un mal link](http://www.bad-test-marcelim.net)', absolutePathFile, { validate: true }).then((links) => {
    expect(links.status).toBe(400);
    expect(links.ok).toBe('FAIL');
  }));

  it('should fail', () => objLinks('[todo mal](no es una url)', absolutePathFile, { validate: true }).then((links) => {
    expect(links.status).toBe(null);
    expect(links.ok).toBe('FAIL');
  }));
});

describe('cmd', () => {
  it('should return error because there is no path', () => expect(cmd())
    .resolves.toMatch(/Por favor, ingresa una ruta/));

  it('should return how many links are in total, how many are unique and how many are broken', () => expect(cmd(absolutePathFile, '-s', '-v')).resolves.toMatch(/(Total)|(Unique)|(Broken)/g));

  it('should return how many links are in total and how many are unique', () => expect(cmd(absolutePathFile, '-s')).resolves.toMatch(/(Total)|(Unique)/g));

  it('should return links with status info', () => expect(cmd(absolutePathFile, '-v')).resolves.toMatch(/(\.md)|(OK)|(FAIL)/g));

  it('should return links without status info', () => expect(cmd(absolutePathFile)).resolves.toMatch(/(🔗)|(\.md)|(https:)|(http:)/g));


  it('should return an error because the file does not have any links', () => expect(cmd(noLinksPath)).rejects.toThrowError(/No links found/));

  it('should return an error because the path does not exists', () => expect(cmd('/file/algo')).rejects.toThrowError(/The path does not exists/));
});
