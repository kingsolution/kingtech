package com.net.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;

import com.net.entity.Question;
import com.net.generic.GenericDao;

public class QuestionDao extends GenericDao<Question, Integer> implements IQuestionDao{
	@Autowired
	private HibernateTemplate  hibernateTemplate;
}
