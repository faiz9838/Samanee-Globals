import API from '../config/apiConfig';
export const fetchProducts = async () => API.get('/products');
export const fetchProductById = async (id) => API.get(`/products/${id}`);
export const fetchProductsByCategory = async (categoryId) => API.get(`/products/category/${categoryId}`);   
