import axios from "axios";
const BASE_URL = "http://localhost:3003/api/blogs";

let userToken = null;
export const setToken = newToken => {
    userToken = `bearer ${newToken}`;
};

export const getAll = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const create = async newBlog => {
    const config = {
        headers: {Authorization: userToken},
    };
    const response = await axios.post(BASE_URL, newBlog, config);
    return response.data;
};

export const remove = async blogId => {
    const config = {
        headers: {Authorization: userToken},
    };
    const response = await axios.delete(`${BASE_URL}/${blogId}`, config);
    return response.data;
};

export const addLike = async blog => {
    const config = {
        headers: {Authorization: userToken},
    };
    blog.likes += 1;
    const response = await axios.put(`${BASE_URL}/${blog.id}`, blog, config);
    return response.data;
};

