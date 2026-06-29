package com.jp.ems.service;

import java.util.List;
import com.jp.ems.entity.Employee;
import org.springframework.data.domain.Page;

public interface EmployeeService {

    Employee saveEmployee(Employee employee);

    List<Employee> getAllEmployees();

    Employee getEmployeeById(Long id);
    Employee updateEmployee(Employee employee);
    void deleteEmployee(Long id);
    
    Page<Employee> getAllEmployees(int page, int size);
}