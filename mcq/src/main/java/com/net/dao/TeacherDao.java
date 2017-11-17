package com.net.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;

import com.net.entity.Teacher;
import com.net.generic.GenericDao;

public class TeacherDao extends  GenericDao<Teacher,Integer> implements ITeacherDao{
	@Autowired
	private HibernateTemplate  hibernateTemplate;
}
