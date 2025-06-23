import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  Alert,
  Button,
  Collapse,
  Form,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from '../common/FooterC';
import axios from 'axios';

const UserInfo = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [formDataMap, setFormDataMap] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8000/OrdinaryUsers');
        setUsers(res.data || []);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
    fetchUsers();
  }, [navigate]);

  const handleToggle = (user) => {
    setExpandedUser((prev) => (prev === user._id ? null : user._id));
    setFormDataMap((prev) => ({
      ...prev,
      [user._id]: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    }));
  };

  const handleInputChange = (userId, e) => {
    const { name, value } = e.target;
    setFormDataMap((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], [name]: value },
    }));
  };

  const handleSubmit = async (userId) => {
    const userData = formDataMap[userId];
    if (!userData.name && !userData.email && !userData.phone) {
      return alert('Please fill in at least one field.');
    }
    if (!window.confirm('Are you sure you want to update this user?')) return;

    try {
      await axios.put(`http://localhost:8000/user/${userId}`, userData);
      alert('✅ User updated successfully!');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to update user.');
    }
  };

  const deleteUser = async (userId) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:8000/OrdinaryUsers/${userId}`);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
      alert('🗑️ User deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to delete user.');
    }
  };

  return (
    <>
      <div className="body">
        <Container className="my-4">
          <h3 className="mb-4">👥 User Management</h3>
          {users.length === 0 ? (
            <Alert variant="info">No users to display.</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <React.Fragment key={user._id}>
                    <tr>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleToggle(user)}
                        >
                          ✏️ Update
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => deleteUser(user._id)}
                        >
                          🗑️ Delete
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="4">
                        <Collapse in={expandedUser === user._id}>
                          <div>
                            <Form
                              className="p-3 border rounded bg-light"
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit(user._id);
                              }}
                            >
                              <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="name"
                                  value={formDataMap[user._id]?.name || ''}
                                  onChange={(e) => handleInputChange(user._id, e)}
                                  placeholder="Enter name"
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                  type="email"
                                  name="email"
                                  value={formDataMap[user._id]?.email || ''}
                                  onChange={(e) => handleInputChange(user._id, e)}
                                  placeholder="Enter email"
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                  type="tel"
                                  name="phone"
                                  value={formDataMap[user._id]?.phone || ''}
                                  onChange={(e) => handleInputChange(user._id, e)}
                                  placeholder="Enter phone number"
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

export default UserInfo;
