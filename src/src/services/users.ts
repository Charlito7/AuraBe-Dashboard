import api from './api';

export const tokenVerification = async () => {
  const response = await api.post('/user/token/validate');
  return response;
};

export const roleVerification = async (roles: string[]) => {
  const formData = new FormData();
  for (const role of roles) {
    formData.append('role', role);
    try {
      const response = await api.post('/user/role/check', formData);
      if (response.status === 200) {
        return true; // Early return if verification succeeds
      }
    } catch (error) {
      console.error("Error occurred while checking role");
     // return false; // Return false if an error occurs during API call
    }
    formData.delete('role'); // Clear role for next iteration
  }
  return false; // Return false if no role verification succeeds
};


export const getUser = async (userId: number) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};