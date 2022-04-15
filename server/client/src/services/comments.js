import { axiosInstance } from "../config";

const baseUrl = '/api/comments';

export const createComment = async (token, text, postId) => {
  try {
    const result = await axiosInstance.post(
      `${baseUrl}/new/${postId}`,
      { text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const likeComment = async (token, id) => {
  try {
    const result = await axiosInstance.put(
      `${baseUrl}/like/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return result;
  } catch (err) {
    return err.response.data;
  }
};
