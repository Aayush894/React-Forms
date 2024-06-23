import { useEffect } from 'react';
import useSurveyForm from '../hooks/useSurveyForm.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SurveyForm = () => {
  const { 
    formData, 
    additionalQuestions, 
    handleChange, 
    handleSubmit, 
    fetchAdditionalQuestions 
  } = useSurveyForm();

  useEffect(() => {
    if (formData.surveyTopic) {
      fetchAdditionalQuestions(formData.surveyTopic);
    }
  }, [formData.surveyTopic, fetchAdditionalQuestions]);

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">Survey Topic:</label>
          <select
            name="surveyTopic"
            value={formData.surveyTopic}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="">Select Survey Topic</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
        </div>

        {formData.surveyTopic === 'Technology' && (
          <div>
            <label className="block">Favorite Programming Language:</label>
            <select
              name="technology.favoriteLanguage"
              value={formData.technology.favoriteLanguage}
              onChange={handleChange}
              className="w-full border p-2"
            >
              <option value="">Select Language</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>

            <label className="block">Years of Experience:</label>
            <input
              type="number"
              name="technology.yearsExperience"
              value={formData.technology.yearsExperience}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
        )}

        {formData.surveyTopic === 'Health' && (
          <div>
            <label className="block">Exercise Frequency:</label>
            <select
              name="health.exerciseFrequency"
              value={formData.health.exerciseFrequency}
              onChange={handleChange}
              className="w-full border p-2"
            >
              <option value="">Select Frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>

            <label className="block">Diet Preference:</label>
            <select
              name="health.dietPreference"
              value={formData.health.dietPreference}
              onChange={handleChange}
              className="w-full border p-2"
            >
              <option value="">Select Diet Preference</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
          </div>
        )}

        {formData.surveyTopic === 'Education' && (
          <div>
            <label className="block">Highest Qualification:</label>
            <select
              name="education.qualification"
              value={formData.education.qualification}
              onChange={handleChange}
              className="w-full border p-2"
            >
              <option value="">Select Qualification</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelors</option>
              <option value="Master's">Masters</option>
              <option value="PhD">PhD</option>
            </select>
           

            <label className="block">Field of Study:</label>
            <input
              type="text"
              name="education.fieldOfStudy"
              value={formData.education.fieldOfStudy}
              onChange={handleChange}
              className="w-full border p-2"
            />
            
          </div>
        )}

        <div>
          <label className="block">Feedback:</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4">
          Submit
        </button>
      </form>

      {additionalQuestions && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Additional Questions:</h2>
          <ul>
            {additionalQuestions.map((question, index) => (
              <li key={index}>{question.text}</li>
            ))}
          </ul>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default SurveyForm;
