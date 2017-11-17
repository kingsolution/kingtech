package com.net.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.net.dao.IExamDao;
import com.net.entity.Exam;
import com.net.generic.GenericService;
import com.net.generic.IGenericDao;

public class ExamService extends GenericService<Exam, Integer> implements IExamService{
	@Autowired
	private IExamDao examDao;
	
	public ExamService(@Qualifier("examDao") IGenericDao<Exam, Integer> genericDao) {
		// TODO Auto-generated constructor stub
		super(genericDao);
		this.examDao = (IExamDao) genericDao;
	}
}
