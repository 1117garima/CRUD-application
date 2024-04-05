import React from 'react';
import './Profile.css'; 

const Profile = ({ data }) => {
  return (
    <div className="profiles-container">
      <h1 className="profiles-heading">Profiles</h1>
      <ul className="profile-list">
        {data.map((item, index) => (
          <li key={index} className="profile-item">
            <div className="left-content">
              {/* Displaying profile picture */}
              {item.profilePicture && (
                <img
                  src={
                    typeof item.profilePicture === 'object'
                      ? URL.createObjectURL(item.profilePicture)
                      : item.profilePicture
                  }
                  alt="Profile"
                  className="profile-picture"
                />
              )}
              <div className="personal-info">
                <span className="name" style={{ marginBottom: '5px', fontSize: '18px', fontWeight: 'bold', color: '#73C2BE'}}>{item.name}</span>
                <span className="email" style={{color:'#776885'}}>{item.email}</span>
                <span className="phone" style={{color:'#776885'}}>{item.phoneno}</span>
                <span className="dob" style={{color:'#776885'}}>{item.dob}</span>
              </div>
            </div>
            <div className="right-content">
              <span className="address">
                <span style={{color:'#5F1A37'}} >City: {item.address.city}</span>
                <span style={{color:'#5F1A37'}}>District: {item.address.district}</span>
                <span className="province">Province: {item.address.province}</span>
                <span className="country">Country: {item.address.country}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
