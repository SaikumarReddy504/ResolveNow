import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Nav } from 'react-bootstrap';

import {
  Container,
  Navbar,
  Dropdown,
  Button,
  Form,
  Card,
  Row,
  Col
} from 'react-bootstrap';
import Footer from './FooterC';
import Logo from '../../Images/logo.png';

const SignUp = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    userType: ''
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserTypeSelect = (type) => {
    setUser((prev) => ({ ...prev, userType: type }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.userType) {
      return alert('Please select a user type.');
    }

    try {
      await axios.post('http://localhost:8000/SignUp', user);
      alert('✅ Account created successfully!');
      setUser({ name: '', email: '', password: '', phone: '', userType: '' });
    } catch (err) {
      console.error('❌ Registration error:', err);
      alert('Failed to register. Try again.');
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img src={Logo} alt="Logo" width="35" height="35" className="me-2" />
            <span className="fw-bold brand-color fs-4">ResolveNow</span>

          </Navbar.Brand>
          <Nav className="ms-auto d-flex flex-row gap-3">
            <Nav.Link as={Link} to="/" className="text-light">Home</Nav.Link>
            <Nav.Link as={Link} to="/signup" className="text-light">Sign Up</Nav.Link>
            <Nav.Link as={Link} to="/login" className="text-light">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Signup Form Section */}
      <section className="bg-light py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="bg-dark text-white shadow-lg">
                <Card.Body className="p-5 text-center">
                  <h2 className="fw-bold mb-4">🚀 Sign Up to File Complaints</h2>
                  <p className="text-white-50 mb-4">Fill in your details below</p>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 text-start">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 text-start">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 text-start">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 text-start">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4 text-start">
                      <Form.Label>User Type</Form.Label>
                      <Dropdown onSelect={handleUserTypeSelect}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="w-100 text-start">
                          {user.userType || 'Select User Type'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="Ordinary">Ordinary</Dropdown.Item>
                          <Dropdown.Item eventKey="Agent">Agent</Dropdown.Item>
                          <Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Form.Group>

                    <Button variant="light" type="submit" className="btn-lg w-100 mt-3">
                      ✅ Register
                    </Button>
                  </Form>
                  <p className="mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-warning fw-bold">Login</Link>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default SignUp;
