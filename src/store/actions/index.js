import api from "../../api/api";

export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`public/products?${queryString}`);
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || 'Failed to fetch products'
    });
  }
}

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });
    const { data } = await api.get(`public/categories`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "CATEGORY_SUCCESS" });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || 'Failed to fetch categories'
    });
  }
}

export const addToCart = (data, qty = 1, toast) => (dispatch, getState) => {
  const { products } = getState().products;
  const getProduct = products.find((item) => item.productId === data.productId);

  const isQuantityExist = getProduct.quantity >= qty;

  if (isQuantityExist) {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...data,
        quantity: qty
      }
    });
    toast.success(`${data.productName} added to the cart`);
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  } else {
    toast.error('Out of stock');
  }
}

export const increaseCartQuantity = (data, toast, currentQty, setCurrrentQty) => (dispatch, getState) => {
  const { products } = getState().products;
  const getProduct = products.find((item) => item.productId === data.productId);

  const isQuantityExist = getProduct.quantity >= currentQty + 1;

  if (isQuantityExist) {
    const newQuantity = currentQty + 1;
    setCurrrentQty(newQuantity);
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...data,
        quantity: newQuantity
      }
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  } else {
    toast.error("Quantity reached to limit");
  }
}

export const decreaseCartQuantity = (data, newQty) => (dispatch, getState) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: {
      ...data,
      quantity: newQty
    }
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
}

export const removeFromCart = (data, toast) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: data
  });
  toast.success(`${data.productName} was removed from cart.`);
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
}

export const authenticateSingInUser = (sentData, toast, reset, navigate, setLoader) => async (dispatch) => {
  try {
    setLoader(true);
    const { data } = await api.post("/auth/signin", sentData);
    dispatch({
      type: "LOGIN_USER",
      payload: data
    });
    localStorage.setItem("auth", JSON.stringify(data));
    reset();
    toast.success("Log in success!");
    navigate("/");
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message || "Internal server error");
  } finally {
    setLoader(false);
  }
}

export const registerNewUser = (sentData, toast, reset, navigate, setLoader) => async (dispatch) => {
  try {
    setLoader(true);
    const { data } = await api.post("/auth/signup", sentData);
    reset();
    toast.success(data?.message || "User registered successfully!");
    navigate("/login");
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message || "Internal server error");
  } finally {
    setLoader(false);
  }
}