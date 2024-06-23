const useValidation = () => {
  
  const validate = (formData) => {
    const errors = {};

    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email must be a valid format';
    } else {
      errors.email = null;
    }

    if (!formData.age || formData.age <= 0) {
      errors.age = 'Age must be a number greater than 0';
    } else {
      errors.age = null; 
    }

    if (formData.attendingWithGuest && !formData.guestName) {
      errors.guestName = 'Guest name is required if attending with a guest';
    } else {
      errors.guestName = null ;
    }

    const isValid = Object.values(errors).every(error => error === null);
    return {isValid, errors};
  };

  return {
    validate,
  };
};

export default useValidation;
