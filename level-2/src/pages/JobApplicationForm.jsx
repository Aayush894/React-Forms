import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useValidation from '../hooks/useValidation';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioUrl: '',
    managementExperience: '',
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      Python: false,
    },
    preferredInterviewTime: '',
  });

  const {validate} = useValidation();
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'fullName' && !/^[a-zA-Z\s]*$/.test(value)) {
      toast.error('Full Name must contain only alphabetic characters');
      return;
    }

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        additionalSkills: {
          ...formData.additionalSkills,
          [name]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  const handleSubmit = (e) => {
    try {
      e.preventDefault();
    
      const {isValid, errors} = validate(formData);

    
      if (!isValid) {
        Object.values(errors).forEach(error => {
          if (error)
          toast.error(error);
        });
        return; 
      }
    
      const submittedFormData = { ...formData };
      setSubmittedData(submittedFormData); 
    
      toast.success('Form submitted successfully!');
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6">
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
          <label className="block">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">Applying for Position:</label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="">Select a position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        {(formData.position === 'Developer' || formData.position === 'Designer') && (
          <div>
            <label className="block">Relevant Experience (years):</label>
            <input
              type="number"
              name="relevantExperience"
              value={formData.relevantExperience}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
        )}
        {formData.position === 'Designer' && (
          <div>
            <label className="block">Portfolio URL:</label>
            <input
              type="text"
              name="portfolioUrl"
              value={formData.portfolioUrl}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
        )}
        {formData.position === 'Manager' && (
          <div>
            <label className="block">Management Experience:</label>
            <input
              type="text"
              name="managementExperience"
              value={formData.managementExperience}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
        )}
        <div>
          <label className="block">Additional Skills:</label>
          <div className="space-x-2">
            {['JavaScript', 'CSS', 'Python'].map(skill => (
              <label key={skill}>
                <input
                  type="checkbox"
                  name={skill}
                  checked={formData.additionalSkills[skill]}
                  onChange={handleChange}
                  className="mr-1"
                />
                {skill}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block">Preferred Interview Time:</label>
          <input
            type="datetime-local"
            name="preferredInterviewTime"
            value={formData.preferredInterviewTime}
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
          <p><strong>Full Name:</strong> {submittedData.fullName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
          <p><strong>Position:</strong> {submittedData.position}</p>
          {(submittedData.position === 'Developer' || submittedData.position === 'Designer') && (
            <p><strong>Relevant Experience:</strong> {submittedData.relevantExperience} years</p>
          )}
          {submittedData.position === 'Designer' && (
            <p><strong>Portfolio URL:</strong> {submittedData.portfolioUrl}</p>
          )}
          {submittedData.position === 'Manager' && (
            <p><strong>Management Experience:</strong> {submittedData.managementExperience}</p>
          )}
          <p><strong>Additional Skills:</strong> {Object.keys(submittedData.additionalSkills).filter(skill => submittedData.additionalSkills[skill]).join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {submittedData.preferredInterviewTime}</p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default JobApplicationForm;
