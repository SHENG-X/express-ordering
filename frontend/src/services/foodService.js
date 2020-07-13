import service from './index';

export const getFood = (fid) => {
  if (fid) {
    return service.get('/food', { _id: fid });
  }
  return service.get('/food');
};

export const createFood = (food) => service.post('/food', { ...food });

export const updateFood = (food) => service.put('/food', { ...food });

export const deleteFood = (food) => service.delete('/food', { data: { _id: food._id, image: food.image } });
