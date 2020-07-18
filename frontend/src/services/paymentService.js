import service from './index';

export const payOrder = (order) => service.post('/pay', { ...order });

// TODO: client side refound logic
export const refoundOrder = () => service.post('/pay/refound');
