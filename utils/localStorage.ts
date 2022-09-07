const LocalStorage = {
  setAuthToken(token: string) {
    localStorage.setItem('auth', token);
  },

  getAuthToken() {
    return localStorage.getItem('auth');
  },

  isAuthenticated() {
    return Boolean(this.getAuthToken());
  },

  clear() {
    localStorage.clear();
  },
};

export default LocalStorage;
