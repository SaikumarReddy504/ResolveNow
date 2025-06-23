import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Navbar, Button } from 'react-bootstrap';
import Footer from './FooterC';
import Logo from '../../Images/logo.png';
import { Nav } from 'react-bootstrap';


const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });

  const handleChange = ({ target: { name, value } }) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8000/Login', user);
      localStorage.setItem('user', JSON.stringify(data));
      alert('✅ Successfully logged in!');
      switch (data.userType) {
        case 'Admin':
          navigate('/AdminHome');
          break;
        case 'Ordinary':
          navigate('/HomePage');
          break;
        case 'Agent':
          navigate('/AgentHome');
          break;
        default:
          navigate('/Login');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        alert('⚠️ Invalid credentials. Please try again.');
      } else {
        alert('❌ Login failed. Please check your connection.');
      }
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

      {/* Login Section */}
      <section className="vh-100 gradient-custom d-flex align-items-center justify-content-center bg-light">
        <Container className="py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white shadow-lg rounded">
                <div className="card-body p-5 text-center">
                  <h3 className="fw-bold mb-4">Login to File a Complaint</h3>
                  <p className="text-white-50 mb-4">Enter your email and password below.</p>

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline form-white mb-4 text-start">
                      <label className="form-label" htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-lg"
                        value={user.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-outline form-white mb-4 text-start">
                      <label className="form-label" htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control form-control-lg"
                        value={user.password}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                      />
                    </div>

                    <Button variant="light" type="submit" className="btn-lg w-100">
                      🔓 Login
                    </Button>
                  </form>

                  <p className="mt-4 mb-0">
                    Don’t have an account?{' '}
                    <Link to="/signup" className="text-warning fw-bold">Sign Up</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default Login;
