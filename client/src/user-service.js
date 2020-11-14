// @flow
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export type User = {
  username: String,
  password: String,
};

class UserService {
  currentUser = '';

  get user() {
    return this.currentUser;
  }

  set user(username: String) {
    this.currentUser = username;
  }

  login(username: String, password: String) {
    return axios
      .post<User, string>('/login', { username: username, password: password })
      .then((response) => (this.currentUser = response.data))
      .catch((error: Error) => {
        console.log(error);
      });
  }
  register(username: String, password: String) {
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
