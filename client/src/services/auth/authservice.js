const AuthService = {
  getRole: () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    return role || null;
  },
  getLoginStatus: () => {
    return !!localStorage.getItem('token');
  },
  logout: () => {
    localStorage.clear();
  }
};

export default AuthService;
