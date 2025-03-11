import axios from 'axios';

class MarketsService {
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

  // POST /api/markets
  createOne = async (requestBody) => {
    return this.api.post('/api/markets/', requestBody);
  }

  // POST /api/markets/:id/favorite
  toggleFav = async (requestBody) => {
    const { marketId } = requestBody;
    return this.api.post(`/api/markets/${marketId}/favorite`, requestBody);
  }

  // GET /api/markets
  getAll = async () => {
    return this.api.get('/api/markets/');
  }

  // GET /api/markets/:id
  getOne = async (id) => {
    return this.api.get(`/api/markets/${id}`);
  }

  // GET /api/markets/town/:townId
  getByTown = async (townId) => {
    return this.api.get(`/api/markets/town/${townId}`);
  }

  // GET /api/markets/user/:userId/favorites
  getFavs = async (userId) => {
    return this.api.get(`/api/markets/user/${userId}/favorites`);
  }

  // PUT /api/markets/:id
  updateOne = async (id, requestBody) => {
    return this.api.put(`/api/markets/${id}`, requestBody);
  }

  // DELETE /api/markets/:id
  deleteOne = async (id) => {
    return this.api.delete(`/api/markets/${id}`);
  } 


}

// Create one instance of the service
const marketsService = new MarketsService();

export default marketsService;