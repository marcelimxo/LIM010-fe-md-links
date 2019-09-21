import {
  pathExist, transformPath, pathIsMarkdown, pathFiles, linksFromFile, objLinks,
} from './api/main';


export default (path, options = { validate: false }) => new Promise((resolve, reject) => {
  if (pathExist(path)) {
    const { validate } = options;
    const absolutePath = transformPath(path);
    const arrPaths = pathFiles(absolutePath);
    let arrLinks = [];
    arrPaths.forEach((paths) => {
      if (pathIsMarkdown(paths)) {
        const links = linksFromFile(paths).map((link) => objLinks(link, paths, validate));
        arrLinks = arrLinks.concat(links);
      }
    });
    if (arrLinks.length > 0) {
      Promise.all(arrLinks).then((res) => resolve(res));
    } else {
      reject(new Error('No links found'));
    }
  } else {
    reject(new Error('The path does not exists'));
  }
});
