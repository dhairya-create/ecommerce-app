import React, { createContext, useReducer, useContext, ReactNode } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number; // Add quantity field
}

interface CartState {
  products: Product[];
}

interface CartContextProps {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number };

const CartContext = createContext<CartContextProps | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProductIndex = state.products.findIndex(
        (p) => p.id === action.payload.id
      );
      if (existingProductIndex >= 0) {
        // Update existing product quantity
        return {
          ...state,
          products: state.products.map((p, index) =>
            index === existingProductIndex
              ? { ...p, quantity: action.payload.quantity }
              : p
          ),
        };
      } else {
        // Add new product
        return {
          ...state,
          products: [...state.products, action.payload],
        };
      }
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { products: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
