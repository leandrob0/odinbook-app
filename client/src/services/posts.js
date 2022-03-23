import axios from 'axios';
const baseUrl = '/api/posts';

export const createPost = async (token, body) => {
  try {
    const result = await axios.post(`${baseUrl}/new_post`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(result.data);
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getTimelinePosts = async (token) => {
  try {
    const result = await axios.get(`${baseUrl}/timeline`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};
