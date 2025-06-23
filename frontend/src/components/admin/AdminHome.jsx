import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import UserInfo from './UserInfo';
import AccordionAdmin from './AccordionAdmin';
import AgentInfo from './AgentInfo';

const AdminHome = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.name) {
      setUserName(user.name);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const componentsMap = {
    dashboard: <AccordionAdmin />,
    UserInfo: <UserInfo />,
    Agent: <AgentInfo />,
  };

  const navTabs = [
    { key: 'dashboard', label: '📊 Dashboard' },
    { key: 'UserInfo', label: '👤 Users' },
    { key: 'Agent', label: '🧑‍🔧 Agents' },
  ];

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand className="fw-bold">👋 Hi Admin, {userName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar" />
          <Navbar.Collapse id="admin-navbar">
            <Nav className="me-auto">
              {navTabs.map((tab) => (
                <Nav.Link
                  key={tab.key}
                  onClick={() => setActiveComponent(tab.key)}
                  className={activeComponent === tab.key ? 'fw-bold text-warning' : 'text-light'}
                >
                  {tab.label}
                </Nav.Link>
              ))}
            </Nav>
            <Button variant="outline-danger" onClick={handleLogout}>
              🔒 Log Out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="container my-4">
        {componentsMap[activeComponent] || <p>Component not found.</p>}
      </main>
    </>
  );
};

export default AdminHome;
