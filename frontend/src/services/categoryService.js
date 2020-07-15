import service from './index';

export const getCategory = (cid) => {
  if (cid) {
    return service.get('/category', { _id: cid });
  }
  return service.get('/category');
};

export const createCategory = (category) => service.post('/category', { ...category });

export const updateCategory = (category) => service.put('/category', { ...category });

export const deleteCategory = (category) => service.delete('/category', { data: { _id: category._id } });
