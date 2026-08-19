import { createContext, useReducer } from "react";

type ProductProp = {
  name: string;
  price: number;
  id: number;
};
type CartItem = ProductProp & {
  quantity: number;
};

type ActionTypes =
  | { type: "ADD_TO_CART"; product: CartItem }
  | { type: "REMOVE_ITEM"; id: number }
  | { type: "UPDATE_QUANTITY"; id: number; quantity: number }
  | { type: "CLEAR" };

type CartContextProp = {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeProduct: (id: number) => void;
  clearCart: () => void;
};
export const CartContext = createContext<CartContextProp | null>(null);

const cartReducer = (state: CartItem[], action: ActionTypes): CartItem[] => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const isExisted = state.find((key) => key.id === action.product.id);
       if(isExisted){
        return state.map((item)=>item.id === action.product.id ? {...item, quantity:action.product.quantity+1}:item) 
       }
       return [
        ...state,
        {
          ...action.product,
          quantity:1
        }
       ]
    }
    case "REMOVE_ITEM": {
      const isExisted = state.filter((key) => key.id !== action.id);
      return isExisted;
    }
    case "UPDATE_QUANTITY": {
      const isExisted = state.filter((key) => key.id !== action.id);
      if(action.quantity <=0 ) return isExisted;
      
      return state.map((item) =>
        item.id === action.id ? { ...item, quantity: action.quantity } : item,
      );
    }
    case "CLEAR":
      return [];
    default:
      return state;
  }
};
const CartProvider = ({children}:{children:React.ReactNode}) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product: CartItem) => {
    dispatch({ type: "ADD_TO_CART", product: product });
  };
  const removeProduct = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };
  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", id, quantity });
  };
  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeProduct, updateQuantity, clearCart }}
    >{children}</CartContext.Provider>
  );
};

export default CartProvider;
