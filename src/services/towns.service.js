import axios from 'axios';

class TownsService {
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

  // POST /api/towns
  createOne = async (requestBody) => {
    return this.api.post('/api/towns/', requestBody);
  }

  // GET /api/towns
  getAll = async () => {
    return this.api.get('/api/towns/');
  }

  // GET /api/towns/:id
  getOne = async (id) => {
    return this.api.get(`/api/towns/${id}`);
  }

  // PUT /api/towns/:id
  updateOne = async (id, requestBody) => {
    return this.api.put(`/api/towns/${id}`, requestBody);
  }

  // DELETE /api/towns/:id
  deleteOne = async (id) => {
    return this.api.delete(`/api/towns/${id}`);
  } 


}

// Create one instance of the service
const townsService = new TownsService();

export default townsService;