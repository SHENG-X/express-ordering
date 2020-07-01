import axios from 'axios';

const endPoint = process.env.API_END_POINT || 'http://localhost:8081';

export const checkEmailExist = async (email) => {
  let exist = true;
  try {
    const response = await axios.get(`${endPoint}/user?email=${email}`);
    if (response.status === 200) {
      exist = false;
    }
  } catch (err) {
    console.log(err);
  }
  return exist;
};

export const signInByToken = async () => {
  const token = localStorage.getItem('express-ordering/user');
  try {
    const response = await axios.post(`${endPoint}/user/sign-in`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    return null;
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const response = await axios.post(`${endPoint}/user/sign-in`, {
      email,
      password,
    });
    return response;
  } catch (err) {
    return null;
  }
};

export const signUp = async ({
  fname,
  lname,
  phone,
  email,
  password,
}) => {
  try {
    const response = await axios.post(`${endPoint}/user`, {
      fname,
      lname,
      phone,
      email,
      password,
    });
    return response;
  } catch (err) {
    return null;
  }
};
