import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

const Home = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const result = await axios.get(`${BASE_URL}employees`);
    console.log(result);
    console.log(result.data);
    setEmployees(result.data);
  };

  return (
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
              <th scope="col">Address</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{employee.empId}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.address}</td>
                
                <td>
                  <button className="btn btn-primary mx-2">View</button>
                  <button className="btn btn-outline-primary mx-2">Edit</button>
                  <button className="btn btn-danger mx-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
