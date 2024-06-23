const useValidation = () => {

  const validate = (formData) => {
    const errors = {};

    if (!formData.fullName) errors.fullName = 'Full Name is required';
    else errors.fullName = null;

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email must be a valid format';
    } else {
      errors.email = null;
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (isNaN(formData.phoneNumber) || formData.phoneNumber.length !== 10) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    } else {
      errors.phoneNumber = null;
    }

    if ((formData.position === 'Developer' || formData.position === 'Designer') && (!formData.relevantExperience || formData.relevantExperience <= 0)) {
      errors.relevantExperience = 'Relevant Experience must be a number greater than 0';
    } else {
      errors.relevantExperience = null;
    }

    if (formData.position === 'Designer' && !formData.portfolioUrl) {
      errors.portfolioUrl = 'Portfolio URL is required';
    } else if (formData.position === 'Designer' && !/^https?:\/\/\S+\.\S+$/.test(formData.portfolioUrl)) {
      errors.portfolioUrl = 'Portfolio URL must be a valid URL';
    } else {
      errors.portfolioUrl = null;
    }

    if (formData.position === 'Manager' && !formData.managementExperience) {
      errors.managementExperience = 'Management Experience is required';
    } else {
      errors.managementExperience = null;
    }

    if (!Object.values(formData.additionalSkills).some(skill => skill)) {
      errors.additionalSkills = 'At least one skill must be selected';
    } else {
      errors.additionalSkills = null;
    }

    if (!formData.preferredInterviewTime) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required';
    } else {
      errors.preferredInterviewTime = null;
    }

    if (formData.preferredInterviewTime.slice(0,10) <= new Date().toISOString().slice(0, 10)) {
      errors.prefferedInterviewTime = 'Preferred Interview Date must be in the future';
    } else {
      console.log(new Date().toISOString().slice(0, 10));
      errors.prefferedInterviewTime = null;
    }

    const isValid = Object.values(errors).every(error => error === null);
    return {isValid, errors};
  };


  return {
    validate,
  };
};

export default useValidation;
