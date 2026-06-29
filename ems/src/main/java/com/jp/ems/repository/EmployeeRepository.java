package com.jp.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jp.ems.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{

}