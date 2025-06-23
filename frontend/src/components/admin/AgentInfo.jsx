import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Table,
  Alert,
  Collapse,
  Form,
} from 'react-bootstrap';
import axios from 'axios';
import Footer from '../common/FooterC';

const AgentInfo = () => {
  const [agents, setAgents] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [formDataMap, setFormDataMap] = useState({});

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/agentUsers');
        setAgents(response.data);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };
    fetchAgents();
  }, []);

  const handleToggle = (id, currentData) => {
    setExpandedRow((prev) => (prev === id ? null : id));
    setFormDataMap((prev) => ({
      ...prev,
      [id]: { ...currentData }, // Initialize form data with current values
    }));
  };

  const handleFormChange = (id, e) => {
    const { name, value } = e.target;
    setFormDataMap((prev) => ({
      ...prev,
      [id]: { ...prev[id], [name]: value },
    }));
  };

  const handleSubmit = async (id) => {
    const data = formDataMap[id];
    if (!data.name && !data.email && !data.phone) {
      alert('Please fill in at least one field before updating.');
      return;
    }
    try {
      await axios.put(`http://localhost:8000/user/${id}`, data);
      alert('✅ Agent updated successfully!');
    } catch (err) {
      console.error(err);
      alert('❌ Update failed. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this agent?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8000/OrdinaryUsers/${id}`);
      setAgents((prev) => prev.filter((agent) => agent._id !== id));
      alert('🗑️ Agent deleted.');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to delete agent.');
    }
  };

  return (
    <>
      <div className="body">
        <Container className="my-4">
          <h3 className="mb-4">🧑‍💼 Agent Management</h3>
          {agents.length === 0 ? (
            <Alert variant="info">No agents to display.</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <React.Fragment key={agent._id}>
                    <tr>
                      <td>{agent.name}</td>
                      <td>{agent.email}</td>
                      <td>{agent.phone}</td>
                      <td>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleToggle(agent._id, agent)}
                        >
                          ✏️ Update
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(agent._id)}
                        >
                          🗑️ Delete
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="4">
                        <Collapse in={expandedRow === agent._id}>
                          <div>
                            <Form
                              className="p-3 border rounded bg-light"
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit(agent._id);
                              }}
                            >
                              <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="name"
                                  value={formDataMap[agent._id]?.name || ''}
                                  onChange={(e) => handleFormChange(agent._id, e)}
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                  type="email"
                                  name="email"
                                  value={formDataMap[agent._id]?.email || ''}
                                  onChange={(e) => handleFormChange(agent._id, e)}
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                  type="tel"
                                  name="phone"
                                  value={formDataMap[agent._id]?.phone || ''}
                                  onChange={(e) => handleFormChange(agent._id, e)}
                                />
                              </Form.Group>
                              <Button type="submit" variant="success" size="sm">
                                💾 Save Changes
                              </Button>
                            </Form>
                          </div>
                        </Collapse>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AgentInfo;
