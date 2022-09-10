import API from '../config/api.config';
import LocalStorage from '../utils/localStorage';

const ListService = {
  async getAll() {
    try {
      const response = await API.get('/list/all', {
        headers: {
          Authorization: `Bearer ${LocalStorage.getAuthToken()}`,
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },

  async create(list: any) {
    try {
      const response = await API.post('/list/create', list, {
        headers: {
          Authorization: `Bearer ${LocalStorage.getAuthToken()}`,
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
};

export default ListService;
