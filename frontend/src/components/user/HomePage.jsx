import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import Footer from '../common/FooterC';
import Complaint from '../user/Complaint';
import Status from '../user/Status';

const HomePage = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('Complaint');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.name) {
      setUserName(user.name);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleTabChange = (tab) => setActiveComponent(tab);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark shadow-sm">
        <div className="container-fluid">
          <h2 className="navbar-brand text-light">👋 Hi, {userName}</h2>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {['Complaint', 'Status'].map((tab) => (
              <li className="nav-item" key={tab}>
                <button
                  className={`nav-link btn text-light ${activeComponent === tab ? 'fw-bold text-warning' : ''}`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab === 'Complaint' ? '📝 Register Complaint' : '📋 View Status'}
                </button>
              </li>
            ))}
          </ul>

          <button className="btn btn-outline-danger" onClick={handleLogout}>
            🔒 Log Out
          </button>
        </div>
      </nav>

      <main className="container my-4">
        {activeComponent === 'Complaint' && <Complaint />}
        {activeComponent === 'Status' && <Status />}
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
