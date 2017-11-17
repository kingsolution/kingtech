package com.net.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.net.dao.ICourseDao;
import com.net.entity.Course;

import com.net.generic.GenericService;
import com.net.generic.IGenericDao;

public class CourseService extends GenericService<Course, Integer> implements ICourseService {
	@Autowired
	private ICourseDao courseDao;
	
	public CourseService(@Qualifier("courseDao") IGenericDao<Course, Integer> genericDao) {
		// TODO Auto-generated constructor stub
		super(genericDao);
		this.courseDao = (ICourseDao) genericDao;
	}
}
