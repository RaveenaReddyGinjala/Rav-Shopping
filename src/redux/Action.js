export const addToCart = (product) => {
  return { type: "ADD_TO_CART", payload: product };
};

export const changeProductCount = (data) => {
  return { type: "CHANGE_PRODUCT_COUNT", payload: data };
};

export const removeCartItem = (key) => {
  return { type: "REMOVE_CART_ITEM", payload: key };
};

export const addSaveForLater = (item) => {
  return { type: "ADD_TO_SAVE_FOR_LATER", payload: item };
};

export const removeSaveForLater = (key) => {
  return { type: "REMOVE_SAVE_FOR_LATER", payload: key };
};

export const setUser = (user) => {
  return { type: "SET_USER", payload: user };
};

export const addProductsToCheckoutPage = (product) => {
  return { type: "ADD_PRODUCTS_TO_CHECKOUT_PAGE", payload: product };
};

export const addCurrentAddress = (address) => {
  return { type: "SET_CURRENT_ADDRESS", payload: address };
};
