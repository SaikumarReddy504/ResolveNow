import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Nav,
  Navbar,
  Card,
  Alert,
  Collapse,
  Spinner
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatWindow from '../common/ChatWindow';
import Footer from '../common/FooterC';

const AgentHome = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [expandedChat, setExpandedChat] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return navigate('/');
        setUserName(user.name);

        const res = await axios.get(`http://localhost:8000/allcomplaints/${user._id}`);
        setComplaints(res.data || []);
      } catch (err) {
        console.error('Error fetching complaints:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [navigate]);

  const toggleChat = (complaintId) => {
    setExpandedChat((prev) => ({
      ...prev,
      [complaintId]: !prev[complaintId],
    }));
  };

  const markAsCompleted = async (complaintId) => {
    try {
      await axios.put(`http://localhost:8000/complaint/${complaintId}`, {
        status: 'completed',
      });
      setComplaints((prev) =>
        prev.map((item) =>
          item._doc.complaintId === complaintId
            ? { ...item, _doc: { ...item._doc, status: 'completed' } }
            : item
        )
      );
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="body">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand>🛠️ Welcome Agent, {userName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="agent-navbar" />
          <Navbar.Collapse id="agent-navbar">
            <Nav className="me-auto">
              <Nav.Link className="text-light">📋 View Complaints</Nav.Link>
            </Nav>
            <Button variant="outline-light" onClick={logout}>
              🔒 Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-4 d-flex flex-wrap justify-content-center gap-4">
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" role="status" />
            <p className="mt-2">Loading complaints...</p>
          </div>
        ) : complaints.length > 0 ? (
          complaints.map(({ _doc, name, address, city, state, pincode, comment }, idx) => {
            const isChatOpen = expandedChat[_doc.complaintId];
            const isCompleted = _doc.status === 'completed';

            return (
              <Card key={idx} style={{ width: '20rem' }} className="shadow-sm">
                <Card.Body>
                  <Card.Title className="text-primary">{name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    📍 {city}, {state}
                  </Card.Subtitle>
                  <Card.Text style={{ fontSize: '14px' }}>
                    <strong>Address:</strong> {address}<br />
                    <strong>Pincode:</strong> {pincode}<br />
                    <strong>Comment:</strong> {comment}<br />
                    <strong>Status:</strong>{' '}
                    <span className={`badge ${isCompleted ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {isCompleted ? 'Completed' : 'Pending'}
                    </span>
                  </Card.Text>

                  {!isCompleted && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => markAsCompleted(_doc.complaintId)}
                    >
                      ✅ Mark as Completed
                    </Button>
                  )}
                  <Button
                    variant="info"
                    size="sm"
                    className="mx-2"
                    onClick={() => toggleChat(_doc.complaintId)}
                    aria-controls={`chat-${_doc.complaintId}`}
                    aria-expanded={isChatOpen}
                  >
                    💬 Message
                  </Button>

                  <Collapse in={isChatOpen}>
                    <div id={`chat-${_doc.complaintId}`} className="mt-3">
                      <Card body className="bg-light">
                        <ChatWindow
                          complaintId={_doc.complaintId}
                          name={userName}
                        />
                      </Card>
                    </div>
                  </Collapse>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <Alert variant="info" className="text-center w-100">
            <Alert.Heading>🛑 No complaints assigned!</Alert.Heading>
            <p>You currently have no tasks assigned.</p>
          </Alert>
        )}
      </Container>

      <Footer />
    </div>
  );
};

export default AgentHome;
