// @flow
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type Task = {
  id: number,
  title: string,
  description: string,
  done: boolean,
};

class TaskService {
  /**
   * Get task with given id.
   */
  get(id: number) {
    return axios.get<Task>('/tasks/' + id).then((response) => response.data);
  }

  /**
   * Get all tasks.
   */
  getAll() {
    return axios.get<Task[]>('/tasks').then((response) => response.data);
  }

  /**
   * Create new task having the given title.
   *
   * Resolves the newly created task id.
   */
  create(title: string, description: string) {
    return axios
      .post<{}, { id: number }>('/tasks', { title: title, description: description })
      .then((response) => response.data.id);
  }

  /**
   * Update given task.
   */
  update(task: Task) {
    return axios.put<Task, void>('/tasks', task).then((response) => response.data);
  }

  /**
   * Delete task with given id.
   */
  delete(id: number) {
    return axios.delete<void>('/tasks/' + id).then((response) => response.data);
  }
}

const taskService = new TaskService();
export default taskService;
