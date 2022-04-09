import axios from 'axios';

const baseUrl = '/api/comments';

export const createComment = async (token, text, postId) => {
  try {
    const result = await axios.post(
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
    const result = await axios.put(
      `${baseUrl}/like/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return result;
  } catch (err) {
    return err.response.data;
  }
};
