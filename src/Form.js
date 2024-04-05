import React, { useState, useEffect } from 'react';
import './Form.css';

const Form = ({ onFormSubmit, editData }) => {
  const [formData, setFormData] = useState({
    srno: '',
    name: '',
    email: '',
    phoneno: '',
    dob: '',
    address: {
      city: '',
      district: '',
      province: '',
      country: 'Nepal'
    },
    profilePicture: null
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        srno: '',
        name: '',
        email: '',
        phoneno: '',
        dob: '',
        address: {
          city: '',
          district: '',
          province: '',
          country: 'Nepal'
        },
        profilePicture: null
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update form data based on input field name
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    // Real-time validation
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        error = value.trim() ? '' : 'Name is required';
        break;
      case 'email':
        error = /\S+@\S+\.\S+/.test(value) ? '' : 'Email is not valid';
        break;
      case 'phoneno':
        error = /^\d{7,}$/.test(value) ? '' : 'Phone number must be at least 7 digits';
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const extension = file.name.split('.').pop().toLowerCase();
    if (extension !== 'png') {
      setErrors({ ...errors, profilePicture: 'Only PNG files are allowed' });
    } else {
      setFormData({ ...formData, profilePicture: file });
      setErrors({ ...errors, profilePicture: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    }
    if (!formData.phoneno.trim()) {
      validationErrors.phoneno = 'Phone number is required';
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onFormSubmit(formData);
      setFormData({
        srno: '',
        name: '',
        email: '',
        phoneno: '',
        dob: '',
        address: {
          city: '',
          district: '',
          province: '',
          country: 'Nepal'
        },
        profilePicture: null
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          autoComplete="off"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="name@example.com"
          autoComplete="off"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Phone no:</label>
        <input
          type="tel"
          name="phoneno"
          placeholder="Phone No."
          pattern="[0-9]{7,}"
          value={formData.phoneno}
          onChange={handleChange}
        />
        {errors.phoneno && <span>{errors.phoneno}</span>}
      </div>
      <div>
        <label>DOB:</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
      </div>
      <div className='address-container'>
        <label>Address:</label>
        <input
          type="text"
          name="address.city"
          placeholder="City"
          value={formData.address.city}
          onChange={handleChange}
        />
        <br/>
        <input
          type="text"
          name="address.district"
          placeholder="District"
          value={formData.address.district}
          onChange={handleChange}
        />
        <br/>
        <select
          name="address.province"
          value={formData.address.province}
          onChange={handleChange}
        >
          <option value="">Select Province</option>
          <option value="Koshi Province">Province 1</option>
          <option value="Madhesh Province">Province 2</option>
          <option value="Bagmati Province">Province 3</option>
          <option value="Gandaki Province">Province 4</option>
          <option value="Lumbini Province">Province 5</option>
          <option value="Karnali Province">Province 6</option>
          <option value="Sudurpashchim Province">Province 7</option>
        </select>
        <input
          type="text"
          name="address.country"
          value={formData.address.country}
          disabled
        />
      </div>
      <div>
        <label>Profile Picture:</label>
        <input
          type="file"
          accept="image/png"
          onChange={handleFileChange}
        />
        {errors.profilePicture && <span>{errors.profilePicture}</span>}
      </div>
      <div>
        <button type="submit">{editData ? 'Update' : 'Submit'}</button>
      </div>
    </form>
  );
};

export default Form;
