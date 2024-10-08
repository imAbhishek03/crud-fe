import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, DEPT_URL } from "../config";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    empid: "",
    name: "",
    phone: "",
    email: "",
    department: "",
  });

  const [departments, setDepartments] = useState([]); // To store department data

  // Fetch department data when the component loads
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Function to fetch departments from your backend (example)
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee, // spread previous state
      [name]: value, // update the specific property dynamically
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}add`, employee);
      console.log("response: ", response.data);
      alert(`Employee record saved successfully.`);
      // Clear the form after submission
      setEmployee({
        empid: "",
        name: "",
        phone: "",
        email: "",
        department: "",
      });
    } catch (error) {
      alert(`Something went wrong!!`);
      console.error("error creating employee", error);
    }

    console.log("employee data: ", employee);
  };

  return (
    <section>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div className="p-4 rounded shadow-lg bg-light">
              <h2 className="text-center mb-4">Add Employee Details</h2>
              <Form onSubmit={handleSubmit}>
                {/* Employee Id Input */}
                <Form.Group className="mb-3">
                  <Row>
                    <Col xs={4} className="d-flex align-items-center">
                      <Form.Label>Employee Id</Form.Label>
                    </Col>
                    <Col xs={8}>
                      <Form.Control
                        type="text"
                        placeholder="Enter Employee Id"
                        className="rounded-pill p-3"
                        name="empid" // Adjust name for state management
                        value={employee.empid} // Ensure value is managed
                        onChange={handleChange} // Ensure onChange is hooked up
                      />
                    </Col>
                  </Row>
                </Form.Group>

                {/* Employee Name Input */}
                <Form.Group className="mb-3">
                  <Row>
                    <Col xs={4} className="d-flex align-items-center">
                      <Form.Label>Employee Name</Form.Label>
                    </Col>
                    <Col xs={8}>
                      <Form.Control
                        type="text"
                        placeholder="Enter Employee Name"
                        className="rounded-pill p-3"
                        name="name" // Adjust name for state management
                        value={employee.name} // Ensure value is managed
                        onChange={handleChange} // Ensure onChange is hooked up
                      />
                    </Col>
                  </Row>
                </Form.Group>

                {/* Email Input */}
                <Form.Group className="mb-3">
                  <Row>
                    <Col xs={4} className="d-flex align-items-center">
                      <Form.Label>Email</Form.Label>
                    </Col>
                    <Col xs={8}>
                      <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        className="rounded-pill p-3"
                        name="email" // Adjust name for state management
                        value={employee.email} // Ensure value is managed
                        onChange={handleChange} // Ensure onChange is hooked up
                      />
                    </Col>
                  </Row>
                </Form.Group>

                {/* Phone Input */}
                <Form.Group className="mb-3">
                  <Row>
                    <Col xs={4} className="d-flex align-items-center">
                      <Form.Label>Phone</Form.Label>
                    </Col>
                    <Col xs={8}>
                      <Form.Control
                        type="number"
                        placeholder="Enter Phone Number"
                        className="rounded-pill p-3"
                        name="phone" // Adjust name for state management
                        value={employee.phone} // Ensure value is managed
                        onChange={handleChange} // Ensure onChange is hooked up
                      />
                    </Col>
                  </Row>
                </Form.Group>

                {/* Department Select Input */}
                <Form.Group className="mb-3">
                  <Row>
                    <Col xs={4} className="d-flex align-items-center">
                      <Form.Label>Department</Form.Label>
                    </Col>
                    <Col xs={8}>
                      <Form.Control
                        as="select"
                        value={employee.department}
                        onChange={handleChange}
                        className="rounded-pill p-3"
                        name="department" // Adjust name for state management
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept.id} value={dept.department}>
                            {dept.department}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </Form.Group>

                {/* Submit Button */}
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 rounded-pill p-2"
                >
                  Submit
                </Button>
                <br />
                <br />
                {/* Cancel add employee */}
                <Link
                  className="btn btn-secondary w-100 rounded-pill p-2"
                  to="/"
                >
                  Cancel
                </Link>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    // <form onSubmit={handleSubmit}>
    //   <h2>Add Employee</h2>
    //   <div>
    //     <label>
    //       Employee Id:
    //       <input
    //         type="text"
    //         name="empid"
    //         value={employee.empid}
    //         onChange={handleChange}
    //         required
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <label>
    //       Name:
    //       <input
    //         type="text"
    //         name="name"
    //         value={employee.name}
    //         onChange={handleChange}
    //         required
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <label>
    //       Email:
    //       <input
    //         type="email"
    //         name="email"
    //         value={employee.email}
    //         onChange={handleChange}
    //         required
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <label>
    //       Phone:
    //       <input
    //         type="number"
    //         name="phone"
    //         value={employee.phone}
    //         onChange={handleChange}
    //         required
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <label>
    //       Department:
    //       <select
    //         name="department"
    //         value={employee.department}
    //         onChange={handleChange}
    //         required
    //       >
    //         <option value="">-- Select --</option>
    //         {/* Populate dropdown options dynamically */}
    //         {departments.map((dept) => (
    //           <option key={dept.id} value={dept.department}>
    //             {dept.department}
    //           </option>
    //         ))}
    //       </select>
    //     </label>
    //   </div>
    //   <button type="submit">Add Employee</button>
    // </form>
  );
};

export default AddEmployee;
