import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useValidation from '../hooks/useValidation';

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: false,
    guestName: ''
  });
  const {validate} = useValidation(); 

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'name' && !/^[a-zA-Z]*$/.test(value)) {
      toast.error('Name must contain only alphabetic characters');
      return;
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
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
      error.forEach((e) => toast.error(e));
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
          <label className="block">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">Are you attending with a guest?</label>
          <input
            type="checkbox"
            name="attendingWithGuest"
            checked={formData.attendingWithGuest}
            onChange={handleChange}
            className="mr-2"
          />
        </div>
        {formData.attendingWithGuest && (
          <div>
            <label className="block">Guest Name:</label>
            <input
              type="text"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4">
          Submit
        </button>
      </form>
      {submittedData && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Submitted Data:</h2>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Age:</strong> {submittedData.age}</p>
          <p><strong>Attending with Guest:</strong> {submittedData.attendingWithGuest ? 'Yes' : 'No'}</p>
          {submittedData.attendingWithGuest && (
            <p><strong>Guest Name:</strong> {submittedData.guestName}</p>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default EventRegistrationForm;
