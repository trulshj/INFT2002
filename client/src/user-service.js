// @flow
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export type User = {
  username: string,
  password: string,
};

class UserService {
  currentUser = '';

  get user() {
    return this.currentUser;
  }

  set user(username: string) {
    this.currentUser = username;
  }

  login(username: string, password: string) {
    return axios
      .post<User, string>('/login', { username: username, password: password })
      .then((response) => (this.currentUser = response.data))
      .catch((error: Error) => {
        console.log(error);
      });
  }
  register(username: string, password: string) {
    return axios
      .post<User, string>('/register', { username: username, password: password })
      .then((response) => console.log(response.data))
      .catch((error: Error) => {
        console.log(error);
      });
  }
}

const userService = new UserService();
export default userService;
