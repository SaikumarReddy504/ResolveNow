import React, { useEffect, useState } from 'react';
import { Accordion, Card, Dropdown, Alert, Badge, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Footer from '../common/FooterC';

const AccordionAdmin = () => {
  const [complaintList, setComplaintList] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [complaintsRes, agentsRes] = await Promise.all([
          axios.get('http://localhost:8000/status'),
          axios.get('http://localhost:8000/AgentUsers')
        ]);
        setComplaintList(complaintsRes.data || []);
        setAgentList(agentsRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAssign = async (agentId, complaintId, status, agentName) => {
    try {
      const assignedComplaint = { agentId, complaintId, status, agentName };
      await axios.post('http://localhost:8000/assignedComplaints', assignedComplaint);

      // Update complaint list UI
      setComplaintList(prev => prev.filter(c => c._id !== complaintId));

      alert(`✅ Complaint assigned to Agent: ${agentName}`);
    } catch (err) {
      console.error("Assignment error:", err);
      alert("❌ Assignment failed. Try again.");
    }
  };

  const renderComplaintCard = (complaint) => (
    <Card key={complaint._id} className="m-2 shadow-sm" style={{ width: '17rem' }}>
      <Card.Body className="text-center">
        <Card.Title className="fw-bold text-primary">{complaint.name}</Card.Title>
        <div className="text-start mt-3" style={{ fontSize: '14px' }}>
          <Card.Text><strong>📍</strong> {complaint.address}, {complaint.city}, {complaint.state}</Card.Text>
          <Card.Text><strong>📮 Pincode:</strong> {complaint.pincode}</Card.Text>
          <Card.Text><strong>📝 Comment:</strong> {complaint.comment}</Card.Text>
          <Card.Text>
            <strong>Status:</strong>{' '}
            <Badge bg={complaint.status === 'completed' ? 'success' : 'warning'}>
              {complaint.status}
            </Badge>
          </Card.Text>
        </div>
        {complaint.status !== 'completed' && (
          <Dropdown className="mt-3">
            <Dropdown.Toggle variant="info" size="sm">Assign Agent</Dropdown.Toggle>
            <Dropdown.Menu>
              {agentList.map((agent) => (
                <Dropdown.Item
                  key={agent._id}
                  onClick={() => handleAssign(agent._id, complaint._id, complaint.status, agent.name)}
                >
                  {agent.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Card.Body>
    </Card>
  );

  const renderAgentCard = (agent) => (
    <Card key={agent._id} className="m-2 shadow-sm" style={{ width: '20rem' }}>
      <Card.Body>
        <Card.Title className="text-success">{agent.name}</Card.Title>
        <Card.Text><strong>Email:</strong> {agent.email}</Card.Text>
      </Card.Body>
    </Card>
  );

  return (
    <div className="container my-4">
      <Accordion defaultActiveKey="0" alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>📂 User Complaints</Accordion.Header>
          <Accordion.Body style={{ background: 'aliceblue' }}>
            {loading ? (
              <div className="text-center my-4">
                <Spinner animation="border" variant="primary" />
                <p>Loading complaints...</p>
              </div>
            ) : (
              <div className="d-flex flex-wrap justify-content-start">
                {complaintList.length > 0
                  ? complaintList.map(renderComplaintCard)
                  : <Alert variant="info" className="w-100 text-center">No complaints to show</Alert>
                }
              </div>
            )}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>👷‍♂️ Available Agents</Accordion.Header>
          <Accordion.Body style={{ background: 'aliceblue' }}>
            {loading ? (
              <div className="text-center my-4">
                <Spinner animation="border" variant="secondary" />
                <p>Loading agents...</p>
              </div>
            ) : (
              <div className="d-flex flex-wrap justify-content-start">
                {agentList.length > 0
                  ? agentList.map(renderAgentCard)
                  : <Alert variant="info" className="w-100 text-center">No agents available</Alert>
                }
              </div>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Footer />
    </div>
  );
};

export default AccordionAdmin;
