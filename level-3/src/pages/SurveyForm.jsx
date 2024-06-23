import useSurveyForm from '../hooks/useSurveyForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SurveyForm = () => {
  const { formData, additionalQuestions, handleChange, handleSubmit, submittedData } = useSurveyForm();

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">
            Full Name: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>
        <div>
          <label className="block">
            Email: <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>
        <div>
          <label className="block">
            Survey Topic: <span className="text-red-500">*</span>
          </label>
          <select
            name="surveyTopic"
            value={formData.surveyTopic}
            onChange={handleChange}
            className="w-full border p-2"
            required
          >
            <option value="">Select Survey Topic</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
        </div>

        {formData.surveyTopic === 'Technology' && (
          <div>
            <label className="block">
              Favorite Programming Language: <span className="text-red-500">*</span>
            </label>
            <select
              name="technology.favoriteLanguage"
              value={formData.technology.favoriteLanguage}
              onChange={handleChange}
              className="w-full border p-2"
              required
            >
              <option value="">Select Language</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>

            <label className="block">
              Years of Experience: <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="technology.yearsExperience"
              value={formData.technology.yearsExperience}
              onChange={handleChange}
              className="w-full border p-2"
              required
            />
          </div>
        )}

        {formData.surveyTopic === 'Health' && (
          <div>
            <label className="block">
              Exercise Frequency: <span className="text-red-500">*</span>
            </label>
            <select
              name="health.exerciseFrequency"
              value={formData.health.exerciseFrequency}
              onChange={handleChange}
              className="w-full border p-2"
              required
            >
              <option value="">Select Frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>

            <label className="block">
              Diet Preference: <span className="text-red-500">*</span>
            </label>
            <select
              name="health.dietPreference"
              value={formData.health.dietPreference}
              onChange={handleChange}
              className="w-full border p-2"
              required
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
            <label className="block">
              Highest Qualification: <span className="text-red-500">*</span>
            </label>
            <select
              name="education.qualification"
              value={formData.education.qualification}
              onChange={handleChange}
              className="w-full border p-2"
              required
            >
              <option value="">Select Qualification</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelors</option>
              <option value="Master's">Masters</option>
              <option value="PhD">PhD</option>
            </select>

            <label className="block">
              Field of Study: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="education.fieldOfStudy"
              value={formData.education.fieldOfStudy}
              onChange={handleChange}
              className="w-full border p-2"
              required
            />
          </div>
        )}

        {additionalQuestions && additionalQuestions.length > 0 && (
          <div>
            <h2 className="text-lg font-bold">Additional Questions:</h2>
            {additionalQuestions.map((question, index) => (
              <div key={index}>
                <label className="block">
                  {question.text} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name={`additionalResponses.${index}`}
                  value={formData.additionalResponses[index] || ''}
                  onChange={handleChange}
                  className="w-full border p-2"
                  required
                />
              </div>
            ))}
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

      {submittedData && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Submitted Data:</h2>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default SurveyForm;
