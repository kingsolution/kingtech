package com.net.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;

import com.net.entity.Course;
import com.net.generic.GenericDao;

public class CourseDao extends GenericDao<Course,Integer> implements ICourseDao{
	@Autowired
	private HibernateTemplate  hibernateTemplate;
}
