import axios from 'axios';
const baseUrl = '/api/posts';

export const createPost = async (token, body) => {
  try {
    const result = await axios.post(`${baseUrl}/new_post`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
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

export const getPostsFromUser = async (token, id) => {
  try {
    const result = await axios.get(`${baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const likePost = async (token, id) => {
  try {
    const result = await axios.put(
      `${baseUrl}/like/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};
