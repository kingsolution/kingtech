package com.net.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.net.dao.IStudentDao;
import com.net.entity.Student;
import com.net.generic.GenericService;
import com.net.generic.IGenericDao;

public class StudentService  extends GenericService<Student, Integer> implements IStudentService {
	@Autowired
	private IStudentDao studentDao;
	
	public StudentService(@Qualifier("studentDao") IGenericDao<Student, Integer> genericDao) {
		// TODO Auto-generated constructor stub
		super(genericDao);
		this.studentDao = (IStudentDao) genericDao;
	}

	@Override
	public Student getMaxStudent() {
		// TODO Auto-generated method stub
		return studentDao.getMaxStudent();
	}

	

}
