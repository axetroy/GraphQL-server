/**
 * Created by axetroy on 17-7-17.
 */

// 提供错误信息的服务
// TODO: 完善错误信息提示服务

class ErrorService {
  constructor() {}
  error(msg: string): Error {
    return new Error(msg);
  }
  ['throw'](name: string, ...argv: string[]) {
    if (name in this) {
      throw new Error(`Invalid`);
    }
  }
}

export default new ErrorService();
