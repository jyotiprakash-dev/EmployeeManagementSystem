package com.jp.ems.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jp.ems.entity.Employee;
import com.jp.ems.exception.ResourceNotFoundException;
import com.jp.ems.repository.EmployeeRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
    
    @Override
    public Employee getEmployeeById(Long id) {

        return employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id : " + id));
    }
    
    @Override
    public Employee updateEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }
    
    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
    
    @Override
    public Page<Employee> getAllEmployees(int page, int size) {

        PageRequest pageable = PageRequest.of(page, size);

        return employeeRepository.findAll(pageable);
    }
}