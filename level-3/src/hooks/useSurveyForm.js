import { useState, useEffect } from 'react';
import useValidation from './useValidation';
import { toast } from 'react-toastify';

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
    additionalResponses: [],
  });

  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);
  const { validate } = useValidation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('technology') || name.startsWith('health') || name.startsWith('education')) {
      const [section, field] = name.split('.');
      setFormData((prevFormData) => ({
        ...prevFormData,
        [section]: {
          ...prevFormData[section],
          [field]: value,
        },
      }));
    } else if (name.startsWith('additionalResponses')) {
      const index = parseInt(name.split('.')[1], 10);
      const updatedResponses = [...formData.additionalResponses];
      updatedResponses[index] = value;
      setFormData((prevFormData) => ({
        ...prevFormData,
        additionalResponses: updatedResponses,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await fetch(`http://localhost:5000/api/survey/questions/${topic}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch additional questions');
      }
      const data = await response.json();

      setAdditionalQuestions(data);
    } catch (error) {
      console.error('Error fetching additional questions:', error);
    }
  };

  useEffect(() => {
    if (formData.surveyTopic) {
      fetchAdditionalQuestions(formData.surveyTopic);
    }
  }, [formData.surveyTopic]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, errors } = validate(formData);

    if (!isValid) {
      Object.values(errors).forEach((error) => {
        if (error) toast.error(error);
      });
      return;
    }

    console.log('Form data submitted:', formData);
    setSubmittedData(formData);
  };

  return {
    formData,
    additionalQuestions,
    submittedData,
    handleChange,
    handleSubmit,
  };
};

export default useSurveyForm;
