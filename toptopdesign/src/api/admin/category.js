import axios from 'axios';

export const getCategories = async () => {
    const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/category/`);
    return res;
}

export const getTagsById = async (id) => {
    const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/category/detail?id=${id}`);
    return res;
}

export const addCategory = async (
    name
) => {
    const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/category/create`, 
        {
            name
        }
    );
    return res;
}

export const addNewTagToCategory = async (
    id,
    tagName,
    count
) => {
    const res = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/category/tag/add/${id}`, 
        {
            tagName, count
        }
    );
    return res;
}

export const updateTagToCategory = async (
    id,
    tags,
) => {
    const res = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/category/tag/delete/${id}`, 
        {
            tags
        }
    );
    return res;
}