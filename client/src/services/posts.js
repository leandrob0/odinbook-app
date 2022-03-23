import axios from 'axios';
const baseUrl = '/api/posts';

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
