/**
 * Created by axetroy on 17-7-13.
 */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const PROJECT_ROOT_PATH = path.join(__dirname, '../');

const PROJECT_CONFIG_PATH =
  process.env.NODE_ENV === 'production'
    ? process.env.PROJECT_CONFIG_PATH
    : path.join(PROJECT_ROOT_PATH, 'config.yaml');

interface Db$ {
  host: string;
}

interface CONFIG$ {
  name: string;
  userPubPath: string;
  adminPubPath: string;
  db: Db$;
}

const CONFIG: CONFIG$ = yaml.safeLoad(
  fs.readFileSync(PROJECT_CONFIG_PATH, 'utf8')
);

export default CONFIG;
