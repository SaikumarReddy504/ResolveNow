import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Collapse, Alert, Badge } from 'react-bootstrap';
import ChatWindow from '../common/ChatWindow';

const Status = () => {
  const [complaints, setComplaints] = useState([]);
  const [openChat, setOpenChat] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?._id) return;

    axios.get(`http://localhost:8000/status/${user._id}`)
      .then((res) => setComplaints(res.data))
      .catch((err) => {
        console.error("Failed to fetch complaints:", err);
      });
  }, []);

  const toggleChatWindow = (id) => {
    setOpenChat((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderComplaintCard = (complaint) => {
    const isOpen = !!openChat[complaint._id];

    return (
      <Card key={complaint._id} className="m-3 shadow-sm" style={{ width: '19rem' }}>
        <Card.Body>
          <Card.Title className="text-primary fw-semibold">{complaint.name}</Card.Title>
          <Card.Text><strong>📍 Address:</strong> {complaint.address}</Card.Text>
          <Card.Text><strong>🏙 City:</strong> {complaint.city}</Card.Text>
          <Card.Text><strong>🌐 State:</strong> {complaint.state}</Card.Text>
          <Card.Text><strong>📮 Pincode:</strong> {complaint.pincode}</Card.Text>
          <Card.Text><strong>📝 Comment:</strong> {complaint.comment}</Card.Text>
          <Card.Text>
            <strong>📌 Status:</strong>{' '}
            <Badge bg={complaint.status.toLowerCase() === 'pending' ? 'warning' : 'success'}>
              {complaint.status}
            </Badge>
          </Card.Text>

          <div className="text-end">
            <Button
              variant="primary"
              onClick={() => toggleChatWindow(complaint._id)}
              aria-controls={`chat-${complaint._id}`}
              aria-expanded={isOpen}
            >
              💬 Message
            </Button>
          </div>

          <Collapse in={isOpen} dimension="width">
            <div id={`chat-${complaint._id}`} className="mt-3">
              <Card body style={{ width: '16rem' }}>
                <ChatWindow complaintId={complaint._id} name={complaint.name} />
              </Card>
            </div>
          </Collapse>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="d-flex flex-wrap justify-content-start p-3">
      {complaints.length > 0 ? (
        complaints.map(renderComplaintCard)
      ) : (
        <Alert variant="info" className="w-100 text-center">
          <Alert.Heading>🔍 No complaints to display</Alert.Heading>
          <p>You haven't registered any complaints yet.</p>
        </Alert>
      )}
    </div>
  );
};

export default Status;
