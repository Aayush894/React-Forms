import { useState } from 'react';
import useValidation from './useValidation';
import {toast} from 'react-toastify';

const useSurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    technology: {
      favoriteLanguage: '',
      yearsExperience: '',
    },
    health: {
      exerciseFrequency: '',
      dietPreference: '',
    },
    education: {
      qualification: '',
      fieldOfStudy: '',
    },
    feedback: '',
  });

  const [additionalQuestions, setAdditionalQuestions] = useState(null); 
  const { validate } = useValidation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('technology') || name.startsWith('health') || name.startsWith('education')) {
      const [section, field] = name.split('.');
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await fetch(`https://api.example.com/questions?topic=${topic}`);
      if (!response.ok) {
        throw new Error('Failed to fetch additional questions');
      }
      const data = await response.json();
      setAdditionalQuestions(data.questions);
    } catch (error) {
      console.error('Error fetching additional questions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {isValid, errors} = validate(formData);

    if (!isValid) {
      errors.forEach(error => {
        if(error) {
            toast.error(error);
        }
      });
      return;
    }

    console.log('Form data submitted:', formData);

    if (formData.surveyTopic) {
      await fetchAdditionalQuestions(formData.surveyTopic);
    }
  };

  return {
    formData,
    additionalQuestions,
    handleChange,
    handleSubmit,
  };
};

export default useSurveyForm;
