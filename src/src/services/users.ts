import api from './api';

export const tokenVerification = async () => {
  const response = await api.post('/user/token/validate');
  return response;
};

export const roleVerification = async (roles: string[]) => {
  const formData = new FormData();
  //formData.append('role', roles);
  const payload = {
    roles : roles
  }
  const response = await api.post('/user/role/check', payload)
  if (response.status === 200) {
    return true;
  }else{
    return false;
  }
};


export const getUser = async (userId: number) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};