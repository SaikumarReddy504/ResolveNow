import React from 'react';
import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from './FooterC';
import Logo from '../../Images/logo.png'; // Adjust path if needed

const About = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm px-3">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
            <img
              src={Logo}
              alt="ResolveNow Logo"
              width="35"
              height="35"
              className="d-inline-block align-top"
            />
            <span className="fw-bold text-info fs-4">ResolveNow</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav className="gap-4">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* About Content */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center mb-4">
            <Col md={10}>
              <h2 className="fw-bold mb-3 text-primary">About ResolveNow</h2>
              <p className="text-muted">
                ResolveNow is a user-focused complaint management system that empowers citizens, agents, and administrators to handle issues transparently and efficiently.
              </p>
            </Col>
          </Row>

          <Row className="text-center">
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <h5 className="text-success">📩 For Users</h5>
                  <p className="text-muted">
                    Register complaints easily, track their status in real-time, and communicate with assigned agents to get resolutions faster.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <h5 className="text-info">🛠️ For Agents</h5>
                  <p className="text-muted">
                    Receive complaint assignments, mark progress, and communicate with users to ensure efficient resolution and satisfaction.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <h5 className="text-warning">🧑‍💼 For Admins</h5>
                  <p className="text-muted">
                    Manage users, assign agents to complaints, and monitor overall system performance and resolution metrics.
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

export default About;
