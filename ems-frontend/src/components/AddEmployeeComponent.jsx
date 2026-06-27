import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const AddEmployeeComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {

            if(id){

                getEmployee(id).then((response)=>{

                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);

                 })
                 .catch(error => {
                    console.error(error);
                });

            }

        }, [id]);

    function saveEmployee(e) {

        e.preventDefault();

        const employee = {
            firstName,
            lastName,
            email
        };

        if (id) {

            updateEmployee(id, employee)
                .then(() => {
                    navigate('/');
                })
                .catch(error => {
                    console.error(error);
                });

        } else {

            createEmployee(employee)
                .then(() => {
                    navigate('/');
                })
                .catch(error => {
                    console.error(error);
                });

        }
    }

    return (

        <div className='container mt-5'>

            <div className='row'>

                <div className='card col-md-6 offset-md-3'>

                    <h2 className='text-center mt-3'>
                        Add Employee
                    </h2>

                    <div className='card-body'>

                        <form>

                            <div className='form-group mb-2'>

                                <label>
                                    First Name :
                                </label>

                                <input
                                    type="text"
                                    placeholder='Enter First Name'
                                    className='form-control'
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)}
                                />

                            </div>

                            <div className='form-group mb-2'>

                                <label>
                                    Last Name :
                                </label>

                                <input
                                    type="text"
                                    placeholder='Enter Last Name'
                                    className='form-control'
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)}
                                />

                            </div>

                            <div className='form-group mb-2'>

                                <label>
                                    Email :
                                </label>

                                <input
                                    type="email"
                                    placeholder='Enter Email'
                                    className='form-control'
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)}
                                />

                            </div>

                            <button
                                className='btn btn-success'
                                onClick={saveEmployee}>

                                Save Employee

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default AddEmployeeComponent;