// @flow
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export type User = {
  username: String,
  password: String,
};

class UserService {
  /**
   * Get quiz with given id.
   */
  login(username: string, password: string) {
    return axios
      .post<User, String>('/login', { username: username, password: password })
      .then((response) => console.log(response.data))
      .catch((error: Error) => {
        console.log(error);
      });
  }
  register(username: string, password: string) {
    return axios
      .post<User, String>('/register', { username: username, password: password })
      .then((response) => console.log(response.data))
      .catch((error: Error) => {
        console.log(error);
      });
  }
}

const userService = new UserService();
export default userService;
