import { axiosInstance } from "../config";
const baseUrl = '/api/posts';

export const createPost = async (token, body) => {
  try {
    const result = await axiosInstance.post(`${baseUrl}/new_post`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getTimelinePosts = async (token) => {
  try {
    const result = await axiosInstance.get(`${baseUrl}/timeline`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getPostsFromUser = async (token, id) => {
  try {
    const result = await axiosInstance.get(`${baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const likePost = async (token, id) => {
  try {
    const result = await axiosInstance.put(
      `${baseUrl}/like/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};
