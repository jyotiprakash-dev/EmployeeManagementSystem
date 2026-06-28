import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const AddEmployeeComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {

        if(id){

            getEmployee(id).then((response)=>{

                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);

            }).catch(error => {
                console.error(error);
            });

        }

    }, [id]);

        function validateForm() {

            let valid = true;

            const errorsCopy = {
                firstName: '',
                lastName: '',
                email: ''
            };

            if (firstName.trim()) {
                errorsCopy.firstName = '';
            } else {
                errorsCopy.firstName = 'First Name is required';
                valid = false;
            }

            if (lastName.trim()) {
                errorsCopy.lastName = '';
            } else {
                errorsCopy.lastName = 'Last Name is required';
                valid = false;
            }

            if (email.trim()) {

                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (emailPattern.test(email)) {
                    errorsCopy.email = '';
                } else {
                    errorsCopy.email = 'Enter a valid email';
                    valid = false;
                }

            } else {
                errorsCopy.email = 'Email is required';
                valid = false;
            }

            setErrors(errorsCopy);

            return valid;
        }

    function saveEmployee(e) {

        e.preventDefault();

        if (!validateForm()) {
            return;
        }

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
                                    placeholder="Enter First Name"
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />

                                {errors.firstName &&
                                    <div className="invalid-feedback">
                                        {errors.firstName}
                                    </div>
                                }

                            </div>

                            <div className='form-group mb-2'>

                                <label>
                                    Last Name :
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Last Name"
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />

                                {errors.lastName &&
                                    <div className="invalid-feedback">
                                        {errors.lastName}
                                    </div>
                                }

                            </div>

                            <div className='form-group mb-2'>

                                <label>
                                    Email :
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                {errors.email &&
                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>
                                }

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