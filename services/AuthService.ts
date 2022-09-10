import API from '../config/api.config';
import LocalStorage from '../utils/localStorage';

const AuthService = {
  async signUp(user: any) {
    try {
      const response = await API.post('/user/signup', user);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      debugger;
      return {
        success: false,
        error,
      };
    }
  },

  async logIn(user: any) {
    try {
      const response = await API.post('/user/login', user);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      debugger;
      return {
        success: false,
        error,
      };
    }
  },

  async getUserDetails() {
    try {
      const token = LocalStorage.getAuthToken();
      const response = await API.get('/user/details', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      debugger;
      return {
        success: false,
        error,
      };
    }
  },
};

export default AuthService;
