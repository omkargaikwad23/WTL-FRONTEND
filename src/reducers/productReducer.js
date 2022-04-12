const productsReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_PRODUCTS": {
        return action.products;
      }
      case "RESET_PRODUCTS": {
        return [];
      }
      case "ADD_PRODUCT": {
        return [...state, action.product];
      }
      case "UPDATE_PRODUCT": {
        return state.map((product)=> {
          if(product._id === action.id) {
            return {
              ...product,
              ...action.updates
            }
          }
          return product
        })
      }
      case "REMOVE_PRODUCT": {
        return state.filter((product) => product._id !== action.id);
      }
      default: {
        return [];
      }
    }
  };
  
  export default productsReducer;