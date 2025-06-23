import React from 'react';
import { Navbar, Container, Button, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Image1 from '../../Images/Image1.png';
import Logo from '../../Images/logo.png';
import Footer from './FooterC';

const Home = () => {
  return (
    <>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4 shadow-sm">
        <Container fluid className="d-flex justify-content-between align-items-center">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
            <img
              src={Logo}
              alt="ResolveNow Logo"
              width="35"
              height="35"
              className="d-inline-block align-top"
            />
            <span className="brand-name">ResolveNow</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="gap-4 nav-pill-style">
              <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className="nav-link-custom">About</Nav.Link>
              <Nav.Link as={Link} to="/signup" className="nav-link-custom">Sign Up</Nav.Link>
              <Nav.Link as={Link} to="/login" className="nav-link-custom">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section className="home-hero py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center mb-4 mb-md-0">
              <img
                src={Image1}
                alt="Digital customer support illustration"
                className="img-fluid rounded shadow"
                style={{ maxHeight: '400px' }}
              />
            </Col>

            <Col md={6}>
              <h1 className="fw-bold text-primary mb-3">
                Empower Your Team, Serve Customers Better
              </h1>
              <h4 className="text-secondary mb-2">
                Simple, Transparent, and Efficient Complaint Management
              </h4>
              <p className="text-muted mb-4">
                ResolveNow helps streamline communication, track issues in real time, and deliver satisfaction across the board—whether you're a user, agent, or admin.
              </p>
              <Link to="/login">
                <Button variant="success" size="lg" className="register-btn">
                  🚀 Resolve Your Issue Now
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
