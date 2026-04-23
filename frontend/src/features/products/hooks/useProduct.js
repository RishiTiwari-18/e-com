import { useDispatch } from "react-redux";
import { setAllProducts, setLoading, setSellerProducts } from "../state/product.slice";
import { createProduct, getAllProducts, getProductById, getSellerProducts } from "../services/products.api";

const useProduct = () => {
    const dispatch = useDispatch();

    const handleCreateProduct = async (productData) => {
        try {
            dispatch(setLoading(true));
            const response = await createProduct(productData);
            return response.product;
        } catch (error) {
            const message = error?.response?.data?.error || 'Failed to create product';
            throw new Error(message)
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleGetSellerProducts = async () => {
        try {
            dispatch(setLoading(true));
            const response = await getSellerProducts();
            dispatch(setSellerProducts(response.products));
        } catch (error) {
            const message = error?.response?.data?.error || 'Failed to fetch products'
            throw new Error(message)
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleGetAllProducts = async () => {
        try {
            dispatch(setLoading(true));
            const response = await getAllProducts();
            dispatch(setAllProducts(response.products));
        } catch (error) {
            const message = error?.response?.data?.error || 'Failed to fetch products'
            throw new Error(message)
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleGetProductById = async (productId) => {
        try {
            dispatch(setLoading(true));
            const response = await getProductById(productId);
            return response.product;
        } catch (error) {
            const message = error?.response?.data?.error || 'Failed to fetch product details'
            throw new Error(message)
        } finally {
            dispatch(setLoading(false));
        }
    }


    return { handleCreateProduct, handleGetSellerProducts, handleGetAllProducts, handleGetProductById };
}

export default useProduct;