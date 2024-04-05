import React, { useState, useEffect } from 'react';
import { UserData } from './UserData';
import Form from './Form';
import Profile from './Profile';
import './App.css';

function App() {
  const [data, setData] = useState(UserData); 
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [showProfiles, setShowProfiles] = useState(false); 

 
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(data));
  }, [data]);

  // Function to handle form submission
  const handleFormSubmit = (formData) => {
    if (editing) {
      const updatedData = [...data];
      updatedData[editIndex] = formData;
      setData(updatedData);
      setEditing(false);
      setEditIndex(null);
    } else {
      const newData = [...data, { ...formData, srno: data.length + 1 }];
      setData(newData);
    }
  };

  // Function to handle editing a user
  const handleEdit = (index) => {
    setEditing(true);
    setEditIndex(index);
  };

  // Function to handle deleting a user
  const handleDelete = (srno) => {
    if (srno > 0) {
      if (window.confirm('Are you sure you want to delete this item?')) {
        const updatedData = data.filter((item) => item.srno !== srno);
        setData(updatedData);
      }
    }
  };

  // Function to handle pagination
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);

  return (
    <div className="App">
      <Form
        onFormSubmit={handleFormSubmit}
        editData={editing ? data[editIndex] : null}
      />
      <table>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>PhoneNo.</th>
            <th>DOB</th>
            <th>City</th>
            <th>District</th>
            <th>Province</th>
            <th>Country</th>
            <th>Profile Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(startIndex, endIndex).map((item, index) => (
            <tr key={startIndex + index}>
              <td>{startIndex + index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phoneno}</td>
              <td>{item.dob}</td>
              <td>{item.address.city}</td>
              <td>{item.address.district}</td>
              <td>{item.address.province}</td>
              <td>{item.address.country}</td>
              <td>
                {item.profilePicture && (
                  <img
                    src={
                      typeof item.profilePicture === 'object'
                        ? URL.createObjectURL(item.profilePicture)
                        : item.profilePicture
                    }
                    alt="Profile"
                    style={{ width: '75px', height: '75px', marginRight: '10px' }}
                  />
                )}
              </td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(startIndex + index)}>
                  Edit
                </button>
                <br/>
                <br/>
                <button className="btn btn-danger" onClick={() => handleDelete(item.srno)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length > pageSize && (
        <div>
          {currentPage > 1 && (
            <button onClick={handlePrevPage}>Previous Page</button>
          )}
          {data.length > endIndex && (
            <button onClick={handleNextPage}>Next Page</button>
          )}
        </div>
      )}
      <br/>
      <br/>
      <br/>
      {/* Button to show profiles */}
      <button onClick={() => setShowProfiles(true)}>Go to Profiles</button>
      {/* Render Profiles component only if showProfiles is true */}
      {showProfiles && <Profile data={data} />}
    </div>
  );
}

export default App;
