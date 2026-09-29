export async function createOrder(orderData) {
  await new Promise((reslove) => {
    setTimeout(reslove, 1500);

    const showFail = Math.random() < 0.3;

    if (showFail) throw new Error("Faild to create order");
  })
  return {
    success: true,
    orderId: Date.now(),
    order: orderData,
  }
}