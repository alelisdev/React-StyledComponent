import axios from 'axios';

export const getAllProducts = async () => {
    const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/products/all`);
    return res.data;
}

export const uploadProductImage = async (images) => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/products/upload`, images, config);
    return res;
}

export const createNewProduct = async (
    productInfo
) => {
    const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/products/create`, 
        {
            productInfo
        }
    );
    return res;
}

export const deleteProductById = async (id) => {
    return await axios.delete(`${process.env.REACT_APP_SERVER_URL}/products/${id}`);
}

export const getProductById = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products/detail?id=${id}`);
    return res;
}

export const getProductByName = async (productName) => {
    const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/products/detail`, 
        {
            productName
        }
    );
    return res;
}

export const upDateProduct = async (id, productInfo) => {
    const res = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/products/${id}`, 
        {
            productInfo
        }
    );
    return res;
}