// @flow

import pool from './mysql-pool.js';
import auth from './auth';

class UserService {
  login(username: string, enteredPassword: string) {
    return new Promise<string>((resolve, reject) => {
      pool.query('SELECT * FROM user_info WHERE username=?', [username], (error, results) => {
        if (error) return reject(error);

        if (results.length == 0) {
          reject(new Error('User not found'));
        } else {
          const enteredHash = auth.hashPassword(enteredPassword, results[0].salt);

          if (enteredHash.hashedPassword == results[0].hash) {
            resolve(username);
          } else {
            reject(new Error('Wrong password'));
          }
        }
      });
    });
  }

  register(username: string, password: string) {
    const salt = auth.makeSalt();
    const hash = auth.hashPassword(password, salt);
    return new Promise<string>((resolve, reject) => {
      pool.query(
        'INSERT INTO user_info SET username=?, hash=?, salt=? ',
        [username, hash.hashedPassword, hash.salt],
        (error, results) => {
          if (error) return reject(new Error(error));

          resolve(username);
        },
      );
    });
  }
}

const userService = new UserService();
export default userService;
