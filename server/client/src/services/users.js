import { axiosInstance } from "../config";
const baseUrl = '/api/users';

export const registerUser = async (body) => {
  try {
    const result = await axiosInstance.post(`${baseUrl}/register`, body);
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const loginUserLocal = async (body) => {
  try {
    const result = await axiosInstance.post(`${baseUrl}/login/local`, body);
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const loginUserFacebook = async (token) => {
  try {
    const result = await axiosInstance.post(`${baseUrl}/login/facebook`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getAllUsers = async (token) => {
  try {
    const result = await axiosInstance.get(`${baseUrl}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getUserInfo = async (token, id) => {
  try {
    const result = await axiosInstance.get(`${baseUrl}/info/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getFriendsRequests = async (token) => {
  try {
    const result = await axiosInstance.get(`${baseUrl}/requests`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const sendFriendRequest = async (token, id) => {
  try {
    const result = await axiosInstance.put(
      `${baseUrl}/friend_request/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const handleFriendRequest = async (token, id, status) => {
  try {
    const result = await axiosInstance.put(
      `${baseUrl}/handle_request/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const changeUserPhoto = async (token, data) => {
  try {
    const result = await axiosInstance.put(`${baseUrl}/change_photo`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};
