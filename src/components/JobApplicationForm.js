import React, { useState } from 'react';
import { database, storage } from '../firebaseConfig';
import './JobApplicationForm.css';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    job: 'data entry clerk',
    utilityBill: null,
    ssn: '',
    licenseFront: null,
    licenseBack: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const uploadFile = async (file, path) => {
    const storageRef = storage.ref(path);
    await storageRef.put(file);
    return await storageRef.getDownloadURL();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newApplicationRef = database.ref('applications').push();
      const appId = newApplicationRef.key;

      const utilityBillURL = await uploadFile(formData.utilityBill, `applications/${appId}/utilityBill`);
      const licenseFrontURL = await uploadFile(formData.licenseFront, `applications/${appId}/licenseFront`);
      const licenseBackURL = await uploadFile(formData.licenseBack, `applications/${appId}/licenseBack`);

      await newApplicationRef.set({
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        job: formData.job,
        ssn: formData.ssn,
        utilityBillURL,
        licenseFrontURL,
        licenseBackURL
      });

      alert('Thank you! Your application has been submitted successfully.');
      window.location.href = '/thank_you.html';
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your application. Please try again.');
    }
  };

  return (
    <div>
      <h1>Job Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="job">Job Position:</label>
          <select id="job" name="job" value={formData.job} onChange={handleChange} required>
            <option value="data entry clerk">Data Entry Clerk</option>
            <option value="sales representative">Sales Representative</option>
            <option value="delivery driver">Delivery Driver</option>
            <option value="customer service representative">Customer Service Representative</option>
          </select>
        </div>
        <div>
          <label htmlFor="utilityBill">Utility Bill (showing your name and address):</label>
          <input type="file" id="utilityBill" name="utilityBill" accept="image/*" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="ssn">SSN:</label>
          <input type="text" id="ssn" name="ssn" value={formData.ssn} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="licenseFront">Driver's License/State ID (front image):</label>
          <input type="file" id="licenseFront" name="licenseFront" accept="image/*" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="licenseBack">Driver's License/State ID (back image):</label>
          <input type="file" id="licenseBack" name="licenseBack" accept="image/*" onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
