import axios from "axios"
const BASE_URL = "/api/persons";

const getAll = async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
}

const create = async (newObject) => {
    const response = await axios.post(BASE_URL, newObject);
    return response.data;
}

const update = async (id, newObject) => {
    const response = await axios.put(`${BASE_URL}/${id}`, newObject);
    return response.data
}

const remove = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
}
const defaults = {getAll, create, update, remove};
export default defaults;