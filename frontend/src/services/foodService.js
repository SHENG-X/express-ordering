import service from './index';

export const createFood = (food) => service.post('/food', { ...food });

export const updateFood = (food) => service.put('/food', { ...food });
