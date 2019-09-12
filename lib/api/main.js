const path = require('path');
const fs = require('fs');

const readPath = (userPath) => {
  if (fs.existsSync(userPath)) {
    return true;
  }
  return false;
};

const transformPath = (userPath) => {
  if (!path.isAbsolute(userPath)) {
    const resolved = path.resolve(userPath);
    return resolved;
  }
  return userPath;
};

const pathFiles = (userPath) => {
  if (fs.lstatSync(userPath).isDirectory()) {
    const paths = fs.readdirSync(userPath);
    return paths;
  } return [userPath];
};

const readPathExt = (userPath) => {
  const pathExt = path.extname(userPath);

  if (pathExt === '.md') {
    return true;
  }
  return false;
};

export {
  readPath, transformPath, readPathExt, pathFiles,
};
