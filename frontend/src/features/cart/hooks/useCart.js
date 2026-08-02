import { useDispatch } from "react-redux";
import { setItems, addItems, setLoading } from "../state/cart.slice";
import { addCartItem, getCartItems } from "../service/cart.service";

const useCart = () => {
  const dispatch = useDispatch();

  const handleSetCartItems = async (items) => {
    try{
      dispatch(setLoading(true));
      const response = await getCartItems();
      dispatch(setItems(response.data));
    } catch (error) {
      console.error("Error setting cart items:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }

  const handleAddCartItems = async (item) => {
    try{
      dispatch(setLoading(true));
      const response = await addCartItem(item);
      dispatch(addItems(response.data));
    } catch (error) {
      console.error("Error adding cart item:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }   
      
  return {
    handleSetCartItems,
    handleAddCartItems
  }
}

export default useCart;