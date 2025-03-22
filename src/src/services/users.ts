import api from './api';

export const tokenVerification = async () => {
  const response = await api.post(process.env.VUE_APP_USER_VALIDATE_TOKEN);
  return response;
};

export const roleVerification = async (roles: string[]) => {
  const formData = new FormData();
  const payload = {
    roles : roles
  }
  const response = await api.post(process.env.VUE_APP_USER_ROLES_CHECK, payload)
  if (response.status === 200) {
    return true;
  }else{
    return false;
  }
};


export const getUser = async (userId: number) => {
  const response = await api.get(`${process.env.VUE_APP_USERS}${userId}`);
  return response.data;
};