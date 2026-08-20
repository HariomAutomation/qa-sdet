export class UserService {
  constructor(apiClient) {
    this.client = apiClient;
  }

  getUsers() {
    return this.client.get("/users");
  }

  getUserById(id) {
    return this.client.get(`/users/${id}`);
  }

  createUser(userData) {
    return this.client.post("/users", userData);
  }

  updateUser(id, userData) {
    return this.client.put(`/users/${id}`, userData);
  }

  deleteUser(id) {
    return this.client.delete(`/users/${id}`);
  }
}
