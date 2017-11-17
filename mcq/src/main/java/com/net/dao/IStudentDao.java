package com.net.dao;

import com.net.entity.Student;
import com.net.generic.IGenericDao;

public interface IStudentDao extends IGenericDao<Student, Integer>{

	Student getMaxStudent();


	

	

}
