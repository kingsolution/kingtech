package com.net.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.net.dao.IQuestionDao;
import com.net.entity.Question;
import com.net.generic.GenericService;
import com.net.generic.IGenericDao;

public class QuestionService extends GenericService<Question, Integer> implements IQuestionService {
	@Autowired
	private IQuestionDao questionDao;
	
	public QuestionService(@Qualifier("questionDao") IGenericDao<Question, Integer> genericDao) {
		// TODO Auto-generated constructor stub
		super(genericDao);
		this.questionDao = (IQuestionDao) genericDao;
	}
}
