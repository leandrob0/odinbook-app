import axios from "axios";
const baseUrl = "http://localhost:4004/api/users";

export const loginUserLocal = async (body) => {
    try{
        const result = await axios.post(`${baseUrl}/login/local`, body);
        return result.data;
    } catch(err) {
        return err.response.data;
    }
}