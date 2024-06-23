const useValidation = () => {

  const validate = (data) => {
    const errors = {};

    if (!data.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email must be a valid format';
    }

    if (!data.surveyTopic) {
      errors.surveyTopic = 'Survey Topic is required';
    }

    if (data.surveyTopic === 'Technology') {
      if (!data.technology.favoriteLanguage) {
        errors.technology = {
          ...errors.technology,
          favoriteLanguage: 'Favorite Programming Language is required',
        };
      }
      if (!data.technology.yearsExperience || data.technology.yearsExperience <= 0) {
        errors.technology = {
          ...errors.technology,
          yearsExperience: 'Years of Experience must be greater than 0',
        };
      }
    }

    if (data.surveyTopic === 'Health') {
      if (!data.health.exerciseFrequency) {
        errors.health = {
          ...errors.health,
          exerciseFrequency: 'Exercise Frequency is required',
        };
      }
      if (!data.health.dietPreference) {
        errors.health = {
          ...errors.health,
          dietPreference: 'Diet Preference is required',
        };
      }
    }

    if (data.surveyTopic === 'Education') {
      if (!data.education.qualification) {
        errors.education = {
          ...errors.education,
          qualification: 'Highest Qualification is required',
        };
      }
      if (!data.education.fieldOfStudy) {
        errors.education = {
          ...errors.education,
          fieldOfStudy: 'Field of Study is required',
        };
      }
    }

    if (data.feedback.trim().length < 50) {
      errors.feedback = 'Feedback must be at least 50 characters';
    }

    const isValid = Object.values(errors).every(error => error === null);
    return { isValid, errors};
  };

  return {
    validate
  };
};

export default useValidation;
