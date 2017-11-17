package com.net.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;

import com.net.entity.Exam;
import com.net.generic.GenericDao;

public class ExamDao extends GenericDao<Exam, Integer> implements IExamDao{
	@Autowired
	private HibernateTemplate  hibernateTemplate;
}
