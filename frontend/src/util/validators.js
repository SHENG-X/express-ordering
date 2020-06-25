export const validateEmail = (rule, value, callback) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (value === '') {
    callback(new Error('Please enter a email'));
  } else if (!re.test(value.toLowerCase())) {
    callback(new Error('Please enter a correct email'));
  } else {
    callback();
  }
};

export const validatePassword = (rule, value, callback) => {
  // password should be at least 8 digits with number and characters
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (value === '') {
    callback(new Error('Please enter a password'));
  } else if (!re.test(value)) {
    callback(new Error('Password must have more then 8 characters, at least one letter and one number'));
  } else {
    callback();
  }
};

export const validatePhone = (rule, value, callback) => {
  // phone number must start with [1-9] and container 10 digits
  const re = /^[1-9][0-9]{9}$/;
  if (value === '') {
    callback(new Error('Please enter a phone number'));
  } else if (!re.test(value)) {
    callback(new Error('Please enter a correct phone number'));
  } else {
    callback();
  }
};
