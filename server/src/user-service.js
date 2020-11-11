// @flow

import pool from './mysql-pool.js';
import makeSalt from './auth';
import hashPassword from './auth';

class UserService {
  login(username: string, enteredPassword: string) {
    return new Promise<number>((resolve, reject) => {
      pool.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
        if (error) return reject(error);
        if (!results.affectedRows) reject(new Error('No row deleted'));

        // console.log(results);
        // const enteredHash = hashPassword(enteredPassword, results.salt)
        // if (enteredHash == results.hash) {
        //     resolve(user_id)
        // }
        // else {
        //     reject(new Error("Wrong password"));
        // }
      });
    });
  }

  register(username: string, password: string) {
    return null;
  }
}

const userService = new UserService();
export default userService;
