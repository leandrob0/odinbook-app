import axios from 'axios';
const baseUrl = '/api/users';

export const registerUser = async (body) => {
  try {
    const result = await axios.post(`${baseUrl}/register`, body);
    return result.data;
  } catch(err) {
    return err.response.data;
  }
}

export const loginUserLocal = async (body) => {
  try {
    const result = await axios.post(`${baseUrl}/login/local`, body);
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};
