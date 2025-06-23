import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Complaint = () => {
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    status: 'Pending',
    comment: ''
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?._id) {
      setFormData(prev => ({ ...prev, userId: user._id }));
    }
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData(prev => ({
      ...prev,
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      status: 'Pending',
      comment: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await axios.post(`http://localhost:8000/Complaint/${formData.userId}`, formData);
      alert("✅ Complaint submitted successfully!");
      handleClear();
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  const fields = [
    { label: 'Name', name: 'name' },
    { label: 'Address', name: 'address' },
    { label: 'City', name: 'city' },
    { label: 'State', name: 'state' },
    { label: 'Pincode', name: 'pincode' },
  ];

  return (
    <div className="text-white complaint-box">
      <form onSubmit={handleSubmit} className="row bg-dark p-3 rounded shadow-lg">

        {fields.map((field) => (
          <div className="col-md-6 p-3" key={field.name}>
            <label htmlFor={field.name} className="form-label">{field.label}</label>
            <input
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              type="text"
              className="form-control"
              id={field.name}
              required
            />
          </div>
        ))}

        <div className="col-md-6 p-3">
          <label htmlFor="status" className="form-label">Status</label>
          <input
            name="status"
            value={formData.status}
            onChange={handleChange}
            type="text"
            placeholder="e.g., Pending"
            className="form-control"
            id="status"
            required
          />
        </div>

        <div className="col-12 p-3">
          <label htmlFor="comment" className="form-label">Description</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="form-control"
            rows="4"
            placeholder="Describe your complaint in detail..."
            required
          />
        </div>

        <div className="text-center col-12 mt-3">
          <button type="submit" className="btn btn-success mx-2">Submit</button>
          <button type="button" className="btn btn-outline-warning" onClick={handleClear}>Clear</button>
        </div>
      </form>
    </div>
  );
};

export default Complaint;
