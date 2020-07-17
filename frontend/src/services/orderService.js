import service from './index';

export const getOrder = (oid) => {
  if (oid) {
    return service.get('/order', { _id: oid });
  }
  return service.get('/order');
};

export const placeOrder = (order) => service.post('/order', { ...order });

export const updateOrder = (order) => service.put('/order', { ...order });

export const cancelOrder = (order) => service.put('/order/cancel', { ...order });

export const deleteOrder = (order) => service.delete('/order', { data: { _id: order._id, image: order.image } });
