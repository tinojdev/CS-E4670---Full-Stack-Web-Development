import axios from "axios";
const BASE_URL = "http://localhost:3003/api/users";

export const getAll = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

