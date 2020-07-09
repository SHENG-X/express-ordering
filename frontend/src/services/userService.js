import service from './index';

export const checkEmailExist = (email) => service.get(`/user?email=${email}`);

export const signInByToken = () => {
  const token = localStorage.getItem('express-ordering/user');
  return service.post('/user/sign-in', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const signIn = ({ email, password }) => service.post('/user/sign-in', { email, password });

export const signUp = ({
  fname,
  lname,
  phone,
  email,
  password,
}) => service.post('/user', {
  fname,
  lname,
  phone,
  email,
  password,
});
