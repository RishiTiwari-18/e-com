import { useDispatch } from "react-redux";
import { setLoading, setProducts } from "../state/product.slice";
import { createProduct, getProducts } from "../services/products.api";

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

    const handleGetProducts = async () => {
        try {
            dispatch(setLoading(true));
            const response = await getProducts();
            dispatch(setProducts(response.products));
        } catch (error) {
            const message = error?.response?.data?.error || 'Failed to fetch products'
            throw new Error(message)
        } finally {
            dispatch(setLoading(false));
        }
    }

    return { handleCreateProduct, handleGetProducts };
}

export default useProduct;