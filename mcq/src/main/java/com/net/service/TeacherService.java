package com.net.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.net.dao.ITeacherDao;
import com.net.entity.Teacher;
import com.net.generic.GenericService;
import com.net.generic.IGenericDao;
import com.net.generic.IGenericService;

public class TeacherService extends GenericService<Teacher, Integer> implements ITeacherService{
	@Autowired
	private ITeacherDao teacherDao;
	
	public TeacherService(@Qualifier("teacherDao") IGenericDao<Teacher, Integer> genericDao) {
		// TODO Auto-generated constructor stub
		super(genericDao);
		this.teacherDao = (ITeacherDao) genericDao;
	}
}
