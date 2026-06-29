package com.jp.ems.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.jp.ems.entity.Employee;
import com.jp.ems.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public Employee saveEmployee(@Valid @RequestBody Employee employee) {
        return employeeService.saveEmployee(employee);
    }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }
    
    @GetMapping("/page")
    public Page<Employee> getEmployeesWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return employeeService.getAllEmployees(page, size);
    }
    
    @GetMapping("{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }
    
    @PutMapping("{id}")
    public Employee updateEmployee(
            @PathVariable Long id,
            @RequestBody Employee employee) {

        Employee existingEmployee =
                employeeService.getEmployeeById(id);

        existingEmployee.setFirstName(employee.getFirstName());
        existingEmployee.setLastName(employee.getLastName());
        existingEmployee.setEmail(employee.getEmail());

        return employeeService.updateEmployee(existingEmployee);
    }
    
    @DeleteMapping("{id}")
    public String deleteEmployee(@PathVariable Long id) {

        employeeService.deleteEmployee(id);

        return "Employee Deleted Successfully";
    }
}