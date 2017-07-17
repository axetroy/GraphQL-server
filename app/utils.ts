/**
 * Created by axetroy on 17-7-14.
 */
import * as moment from 'moment';

/**
 * 格式化工具
 */
class Formatter {
  private value: any;
  constructor(private data: any) {
    this.value = data;
  }
  RFC3339Nano(): Formatter {
    this.value = moment(this.value).format(`YYYY-MM-DDTHH:mm:ss.SSSZ`);
    return this;
  }
  RFC3339NanoMaper(): Formatter {
    const obj = this.value;
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr) && obj[attr] instanceof Date) {
        obj[attr] = RFC3339NanoFormat(obj[attr]);
      }
    }
    this.value = obj;
    return this;
  }
  val(): any {
    return this.value;
  }
}

export function formatter(data: any) {
  return new Formatter(data);
}

export function RFC3339NanoFormat(date: Date) {
  return moment(date).format(`YYYY-MM-DDTHH:mm:ss.SSSZ`);
}

export function RFC3339NanoMaper(obj: any) {
  for (let attr in obj) {
    if (obj.hasOwnProperty(attr) && obj[attr] instanceof Date) {
      obj[attr] = RFC3339NanoFormat(obj[attr]);
    }
  }
  return { ...obj };
}

export function sortCheck(sortStr: string, errorMsg: string) {
  if (/^[\+\-]\w+$/.test(sortStr) === false) {
    throw new Error(
      errorMsg ||
        `Invalid sort field ${sortStr}, It must be prefix as '+' for '-'.`
    );
  }
}

interface SortParserReturn$ {
  sortField: string;
  sortDir: string;
  sortStr: string;
}

export function sortParser(sortStr: string): SortParserReturn$ {
  const sortArray: string[] = sortStr.match(/^([\+\-])(\w+)$/) || [];
  const sortDir: string = sortArray[1] || '-';
  const sortField: string = sortArray[2] || 'createdAt';
  return {
    sortField,
    sortDir,
    sortStr
  };
}
