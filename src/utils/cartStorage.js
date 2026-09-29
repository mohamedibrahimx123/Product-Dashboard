const CART_STROAGE_KEY = "cart";

export function getStoredCart() {
  const savedCart =
    localStorage.getItem(CART_STROAGE_KEY);

  if (!savedCart) return [];

  try {
    const parsedCart = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) {
      return [];
    }
    return parsedCart
  } catch (error) {
    console.error(
      "Faild to parse saved cart: ",
      error
    )
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_STROAGE_KEY, JSON.stringify(cart))
}