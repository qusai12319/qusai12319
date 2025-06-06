import { createContext, useReducer } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(item => item.id === productToAdd.id);
  if (existingCartItem) {
    return cartItems.map(item =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const deleteItemsFromCartItems = (cartItems, productToDelete) => {
  const existingCartItem = cartItems.find(item => item.id === productToDelete.id);
  if (!existingCartItem) return cartItems;

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(item => item.id !== productToDelete.id);
  }

  return cartItems.map(item =>
    item.id === productToDelete.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

const removeAttAll = (cartItems, product) =>
  cartItems.filter(item => item.id !== product.id);

// Initial State
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

// Reducer
const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_CART_ITEMS':
      return {
        ...state,
        cartItems: payload.cartItems,
        cartCount: payload.cartCount,
        cartTotal: payload.cartTotal,
      };
    case 'SET_IS_CART_OPEN':
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type: ${type}`);
  }
};

// Create Context
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  deleteItems: () => {},
  removeCompletely: () => {},
  cartCount: 0,
  cartTotal: 0,
});

// Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartCount, cartTotal } = state;

  const updateCartItems = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    dispatch({
      type: 'SET_CART_ITEMS',
      payload: {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      },
    });
  };

  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItems(newCartItems);
  };

  const deleteItems = (product) => {
    const newCartItems = deleteItemsFromCartItems(cartItems, product);
    updateCartItems(newCartItems);
  };

  const removeCompletely = (product) => {
    const newCartItems = removeAttAll(cartItems, product);
    updateCartItems(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch({ type: 'SET_IS_CART_OPEN', payload: bool });
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    deleteItems,
    removeCompletely,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
