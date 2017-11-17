package com.net.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;

import com.net.entity.Subject;
import com.net.generic.GenericDao;

public class SubjectDao extends GenericDao<Subject,Integer> implements ISubjectDao {
	@Autowired
	private HibernateTemplate  hibernateTemplate;
}
