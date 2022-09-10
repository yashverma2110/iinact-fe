import API from '../config/api.config';
import LocalStorage from '../utils/localStorage';

const ScheduleService = {
  async getAll() {
    try {
      const response = await API.get('/schedule/all', {
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

export default ScheduleService;
