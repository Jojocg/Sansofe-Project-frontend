import axios from 'axios';

class UsersService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL /* || "http://localhost:5005" */
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }


  // GET /api/users/profile/:id
  getOneProfile = async (id) => {
    return this.api.get(`/api/users/profile/${id}`);
  }

}

// Create one instance of the service
const usersService = new UsersService();

export default usersService;