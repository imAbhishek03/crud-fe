import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, DEPT_URL } from "../config";

import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faUserXmark } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editSelectedEmployee, setEditSelectedEmployee] = useState(null);
  const [editId, setEditId] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const [departments, setDepartments] = useState([]);

  // handling modal open or close

  const handleClose = () => {
    setViewShow(false);
    setEditShow(false);
    setDeleteShow(false);
  };
  const handleViewShow = () => setViewShow(true);
  const handleEditShow = () => setEditShow(true);
  const handleDeleteShow = () => setDeleteShow(true);

  // load all employee list on page loading

  const loadEmployees = async () => {
    const result = await axios.get(`${BASE_URL}employees`);
    console.log(result);
    console.log(result.data);
    setEmployees(result.data);
  };

  //calling view API for selected employee
  const handleView = async (id) => {
    try {
      console.log("id ---- ", id);

      const response = await axios.get(`${BASE_URL}get/${id}`);
      console.log(response.data);
      setSelectedEmployee(response.data);
      handleViewShow();
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  // Function to fetch departments from backend
  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${DEPT_URL}getAll`); // replace with your API endpoint
      // const data = await response.json();
      console.log(response.data);

      setDepartments(response.data); // Assuming data is an array of department objects
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  //calling fetch employee data from backend for assigning to edit fields
  const handleEdit = async (id) => {
    try {
      console.log("id ----- ", id);
      setEditId(id);

      const response = await axios.get(`${BASE_URL}get/${id}`);
      if (response.data != null) {
        console.log(response.data);
        fetchDepartments();
        setEditSelectedEmployee(response.data);
        handleEditShow();
      } else {
        console.error("Data empty/////");
      }
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  // storing field data to editSelectedEmployee from input fields
  const handleEditFieldChange = (e) => {
    const { name, value } = e.target; // Get input name and value
    setEditSelectedEmployee((prev) => ({
      ...prev,
      [name]: value, // Update the specific field
    }));
  };

  // calling edit API for selected employee
  const handleEditChange = async (employee) => {
    try {
      const response = await axios.put(`${BASE_URL}update/${editId}`, employee);
      console.log(response);
      if (response.status == "200") {
        setEditShow(false);
        alert("Employee Details Updated Successfully.");
        loadEmployees();
      }
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    handleDeleteShow();
  };

  //calling delete API for selected employee
  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}delete/${deleteId}`);
      console.log("response --- ", response.data);
      handleClose();
      loadEmployees();
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <section>
      <div className="container">
        <div className="py-4">
          <table className="table border shadow">
            <thead style={{ borderBottom: "2px solid black" }}>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Emp Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Department</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee.id}>
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{employee.empid}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.department}</td>

                  <td>
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => handleView(employee.id)}
                    >
                      <FontAwesomeIcon icon={faList} />
                    </button>
                    <button
                      className="btn btn-outline-primary mx-2"
                      onClick={() => handleEdit(employee.id)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => {
                        handleDelete(employee.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faUserXmark} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* view modal  */}

      <Modal show={viewShow} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee ? (
            <Container>
              <Row>
                <Col>
                  <label>Employee Id :</label>
                </Col>
                <Col>{selectedEmployee.empid}</Col>
              </Row>
              <Row>
                <Col>Name : </Col>
                <Col>{selectedEmployee.name}</Col>
              </Row>
              <Row>
                <Col>Email : </Col>
                <Col>{selectedEmployee.email}</Col>
              </Row>
              <Row>
                <Col>Phone : </Col>
                <Col>{selectedEmployee.phone}</Col>
              </Row>
              <Row>
                <Col>Department : </Col>
                <Col>{selectedEmployee.department}</Col>
              </Row>
            </Container>
          ) : (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </Button> // Show a loading message until data is available
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit modal */}

      <Modal show={editShow} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editSelectedEmployee ? (
            <div>
              {/* Employee Id Input */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                  Employee Id
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="empid"
                    value={editSelectedEmployee.empid}
                    onChange={handleEditFieldChange}
                  />
                </Col>
              </Form.Group>

              {/* Name Input */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                  Name
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="name"
                    value={editSelectedEmployee.name}
                    onChange={handleEditFieldChange}
                  />
                </Col>
              </Form.Group>

              {/* Email Input */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                  Email
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="email"
                    name="email"
                    value={editSelectedEmployee.email}
                    onChange={handleEditFieldChange}
                  />
                </Col>
              </Form.Group>

              {/* Phone Input */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                  Phone
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={editSelectedEmployee.phone}
                    onChange={handleEditFieldChange}
                  />
                </Col>
              </Form.Group>

              {/* Department Input */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                  Department
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    as="select"
                    name="department"
                    value={editSelectedEmployee.department}
                    onChange={handleEditFieldChange}
                  >
                   <option value="">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept.id} value={dept.department}>
                            {dept.department}
                          </option>
                        ))} 
                  </Form.Control>
                </Col>
              </Form.Group>
            </div>
          ) : (
            <p>Loading employee details...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleEditChange(editSelectedEmployee)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}

      <Modal show={deleteShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this record?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Home;
