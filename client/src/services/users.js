import axios from 'axios';
const baseUrl = '/api/users';

export const registerUser = async (body) => {
  try {
    const result = await axios.post(`${baseUrl}/register`, body);
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const loginUserLocal = async (body) => {
  try {
    const result = await axios.post(`${baseUrl}/login/local`, body);
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const loginUserFacebook = async (token) => {
  try {
    const result = await axios.post(`${baseUrl}/login/facebook`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getAllUsers = async (token) => {
  try {
    const result = await axios.get(`${baseUrl}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getUserInfo = async (token,id) => {
  try {
    const result = await axios.get(`${baseUrl}/info/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
}
