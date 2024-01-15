const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  saveforlater: localStorage.getItem("saveforlater")
    ? JSON.parse(localStorage.getItem("saveforlater"))
    : [],
  user: sessionStorage.getItem("user") ? sessionStorage.getItem("user") : null,
  checkedproduct: localStorage.getItem("checkedproduct")
    ? JSON.parse(localStorage.getItem("checkedproduct"))
    : [],
  isloading: true,
  clearcartFlag: sessionStorage.getItem("clearcartFlag")
    ? sessionStorage.getItem("clearcartFlag")
    : false,

  currentaddress: {},
  paymentDeatils: {},
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_TO_CART":
      let existingproduct = state.cart.find((item) => item.id === payload.id);
      console.log(existingproduct);

      if (existingproduct) {
        const quantityupdatedcart = state.cart.map((item) => {
          if (item.id === payload.id) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        });
        localStorage.setItem("cart", JSON.stringify(quantityupdatedcart));
        return { ...state, cart: quantityupdatedcart };
      } else {
        localStorage.setItem("cart", JSON.stringify([...state.cart, payload]));
        return { ...state, cart: [...state.cart, payload] };
      }

    case "CHANGE_PRODUCT_COUNT":
      const updatedCart = state.cart.map((item) => {
        if (payload.key === item.id) {
          return {
            ...item,
            count:
              payload.changeType === "increment"
                ? item.count + 1
                : item.count - 1,
          };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return { ...state, cart: updatedCart };

    case "REMOVE_CART_ITEM":
      const filteredCart = state.cart.filter((item) => item.id !== payload);
      localStorage.setItem("cart", JSON.stringify(filteredCart));
      return { ...state, cart: filteredCart };
    case "ADD_TO_SAVE_FOR_LATER":
      localStorage.setItem(
        "saveforlater",
        JSON.stringify([...state.saveforlater, payload])
      );

      return { ...state, saveforlater: [...state.saveforlater, payload] };

    case "REMOVE_SAVE_FOR_LATER":
      const filteredSaveForLater = state.saveforlater.filter(
        (item) => item.id !== payload
      );
      localStorage.setItem(
        "saveforlater",
        JSON.stringify(filteredSaveForLater)
      );
      return { ...state, saveforlater: filteredSaveForLater };
    case "SET_USER":
      sessionStorage.setItem("user", payload);
      return { ...state, user: payload };

    case "ADD_PRODUCTS_TO_CHECKOUT_PAGE":
      console.log(payload);
      localStorage.setItem("checkedproduct", JSON.stringify(payload));

      return { ...state, checkedproduct: payload };

    case "CLEAR_CART_FLAG":
      sessionStorage.setItem("clearcartFlag", JSON.stringify(payload));
      return { ...state, clearcartFlag: payload };

    case "CLEAR_CART":
      localStorage.setItem("cart", JSON.stringify([]));

      return { ...state, cart: [] };

    case "SET_CURRENT_ADDRESS":
      console.log(payload);
      return { ...state, currentaddress: payload };

    default:
      return state;
  }
};
