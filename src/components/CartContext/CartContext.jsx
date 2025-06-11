import axios from "axios";
import { useContext, useEffect, useState, createContext } from "react";
import { AuthContext } from "./../../Context/AuthContext";


export const cartContext = createContext();

const CartContextProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [product, setProduct] = useState([]);
  const [numOfItems, setNumOfItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoad, setIsLoad] = useState(false);
  const [cartId, setCartId] = useState(null);

  async function addProductToCart(productId, quantity = 1) {
    try {
      const { data } = await axios.post(
        "https://beige-alligator-527710.hostingersite.com/public/api/cart/add",
        { product_id: productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tkn")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Add to Cart Response:", data); // Log the complete response


      getUserCart();
      return { success: true, message: data.message || "Product added to cart!", data };

    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error);

      return {
        success: false,
        message: error.response?.data?.message || "Error adding product to cart. Please try again.",
      };
    }
  }


  async function getUserCart() {
    // setIsLoad(true);
    try {
      const { data } = await axios.get(
        "https://beige-alligator-527710.hostingersite.com/public/api/cart",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tkn")}`,
            Accept: "application/json",
          },
        }
      );

      const items = data.data.items || [];
      const total = items.reduce((acc, item) => acc + parseFloat(item.total), 0);

      setNumOfItems(items.length);
      setProduct(items);
      setTotalPrice(total.toFixed(2));
      setCartId(data.data.id);
      console.log(data)

    } catch (error) {
      console.error("Error fetching user cart:", error.response?.data || error);}
    // } finally {
    //   setIsLoad(false);
    // }
  }


 async function updateCount(productId, newQuantity) {
  try {
    const { data } = await axios.post(
      `https://beige-alligator-527710.hostingersite.com/public/api/cart/add`,
      {
        product_id: productId,
        quantity: newQuantity,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tkn")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

   
    await getUserCart();
    const items = getUserCart.data.data.items;
    const total = items.reduce((acc, item) => acc + parseFloat(item.total), 0);

    setProduct(items);
    setNumOfItems(items.length);
    setTotalPrice(total.toFixed(2));
  } catch (error) {
    console.error("Error updating item quantity:", error.response?.data || error);
  }
}


  async function clearItem(id) {
    try {

      const { data } = await axios.post(
        "https://beige-alligator-527710.hostingersite.com/public/api/cart/remove",
        { product_id: id },
        {
          headers: {
            // Authorization: `Bearer ${token}`,
            Authorization: `Bearer ${localStorage.getItem("tkn")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const updatedItems = product.filter(item => item.product.id !== id);
      const updatedTotalPrice = updatedItems.reduce((acc, item) => acc + parseFloat(item.total), 0);

      setProduct(updatedItems);
      setNumOfItems(updatedItems.length);
      setTotalPrice(updatedTotalPrice.toFixed(2));

    } catch (error) {
      console.error("Error removing item from cart:", error.response?.data || error);
    }
  }


  async function clearCart() {
    if (product.length === 0) {
      alert("Wishlist is already empty.");
      return;
    }
    const confirmed = window.confirm("Are you sure you want to clear your cart?");
    if (!confirmed) return;

    try {
      const { data } = await axios.delete(
        "https://beige-alligator-527710.hostingersite.com/public/api/cart/delete", // Use correct endpoint
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tkn")}`,
            Accept: "application/json",
          },
        }
      );

      // Refresh state only after success
      setNumOfItems(0);
      setProduct([]);
      setTotalPrice(0);
      alert("Your cart has been cleared successfully.");
      console.log("Cart cleared:", data);
    } catch (error) {
      console.error("Error clearing cart:", error.response?.data || error);
      alert("Something went wrong while clearing your cart. Please try again.");
    }
  }

  useEffect(() => {
    if (token !== null) { getUserCart(); }
  }, [token]);

  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        product,
        numOfItems,
        totalPrice,
        isLoad,
        updateCount,
        clearItem,
        clearCart,
        cartId,
        setNumOfItems,
        setProduct,
        setTotalPrice,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
