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

export const signIn = async ({ email, password }) => {
  try {
    const response = await axios.post(`${endPoint}/auth`, {
      email,
      password,
    });
    if (response.status === 200) {
      console.log('Sign In Success!!!');
    }
  } catch (err) {
    console.log(err);
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
    if (response.status === 201) {
      console.log('Sign Up Success!!!');
    }
  } catch (err) {
    console.log(err);
  }
};
