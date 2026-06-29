import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {listEmployeesWithPagination, deleteEmployee} from '../services/EmployeeService';

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const [searchTerm, setSearchTerm] = useState('');

    function getAllEmployees(page = currentPage) {

        listEmployeesWithPagination(page, pageSize).then((response) => {

            setEmployees(response.data.content);
            setCurrentPage(response.data.number);
            setTotalPages(response.data.totalPages);

        })
        .catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        getAllEmployees(currentPage);
    }, [currentPage]);

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

            <div className="d-flex justify-content-center align-items-center mt-3">

                <button className="btn btn-secondary me-2"
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage(currentPage - 1)}>

                    Previous

                </button>

                <span className="mx-3">
                    Page {currentPage + 1} of {totalPages}
                </span>

                <button className="btn btn-secondary ms-2"
                    disabled={currentPage + 1 === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}>

                    Next

                </button>

            </div>
        </div>
    );
};

export default ListEmployeeComponent;