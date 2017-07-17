/**
 * Created by axetroy on 17-7-13.
 */

interface Db$ {
  host: string
}

interface CONFIG$ {
  db: Db$
}

const CONFIG: CONFIG$ = {
  db: {
    host: 'localhost'
  }
};

export default CONFIG;