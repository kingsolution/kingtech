package com.net.service;

import com.net.entity.Student;
import com.net.generic.IGenericService;

public interface IStudentService extends IGenericService<Student, Integer>{

	Student getMaxStudent();

	

}
