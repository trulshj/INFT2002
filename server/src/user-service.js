// @flow

import pool from './mysql-pool.js';
import makeSalt from './auth';
import hashPassword from './auth';

class UserService {
  login(username: string, password: string) {
    return null;
  }

  register(username: string, password: string) {
    return null;
  }
}

const userService = new UserService();
export default userService;
