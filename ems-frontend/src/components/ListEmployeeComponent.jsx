import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { listEmployees, deleteEmployee } from '../services/EmployeeService';

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    function getAllEmployees() {

        listEmployees()
        .then((response) => {
            setEmployees(response.data);
        })
        .catch(error => {
            console.error(error);
        });

    }

    useEffect(() => {
        getAllEmployees();
    }, []);

    const navigate = useNavigate();

        function addNewEmployee() {
            navigate('/add-employee');
        }

        function updateEmployee(id) {
            navigate(`/edit-employee/${id}`);
        }

        function removeEmployee(id) {

            if(window.confirm("Are you sure you want to delete this employee?")){

                deleteEmployee(id)
                .then(() => {
                    getAllEmployees();
                })
                .catch(error => {
                    console.error(error);
                });

            }

        }

    return (

        
        <div className="container mt-5">
            <h2 className="text-center mb-4">
                Employee List
            </h2>
            <button
                className='btn btn-primary mb-2'
                onClick={addNewEmployee}>

                Add Employee

            </button>

            <div className="row mb-3">
                <div className="col-md-4">
                    <input type="text"
                    className="form-control"
                    placeholder="Search by First Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </div>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        employees.filter(employee =>
                        employee.firstName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                        )
                        .map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                     <button className='btn btn-warning'
                                        onClick={() => updateEmployee(employee.id)}>

                                        Edit

                                    </button>
                                    <button className="btn btn-danger ms-2"
                                        onClick={() => removeEmployee(employee.id)}>

                                        Delete

                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ListEmployeeComponent;