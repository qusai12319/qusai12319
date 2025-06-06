import { createContext } from "react";

export const ProductContext = createContext({
  categoriesMap: [],
});

export const ProductProvider = ({ children }) => {


  return (
    <ProductContext.Provider >
      {children}
    </ProductContext.Provider>
  );
};
