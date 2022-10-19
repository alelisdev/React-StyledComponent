import axios from 'axios';

export const getCollectionById = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/collection/detail?id=${id}`);
    return res;
}

export const getCollectionByName = async (key) => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/collection/search?keyword=${key}`);
    return res.data;
}

export const createNewCollection = async (name, des) => {
    const newCollection = { collectionName: name, description: des };
    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/collection/`, newCollection);
    return res.data;
}

export const getAllCollection = async () => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/collection/`);
    return res.data;
}

export const getActiveCollections = async () => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/collection/active`);
    return res;
}

export const getSuspendedCollections = async () => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/collection/suspended`);
    return res;
}

export const suspendByIds = async (ids) => {
    const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/collection/suspend`, 
        {
            ids,
        }
    );
    return res;
}

export const unSuspendByIds = async (ids) => {
    const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/collection/unsuspend`, 
        {
            ids,
        }
    );
    return res;
}