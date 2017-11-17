package com.net.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;


import com.net.dao.ISubjectDao;

import com.net.entity.Subject;
import com.net.generic.GenericService;
import com.net.generic.IGenericDao;

public class SubjectService extends GenericService<Subject, Integer> implements ISubjectService{
	@Autowired
	private ISubjectDao subjectDao;
	
	public SubjectService(@Qualifier("subjectDao") IGenericDao<Subject, Integer> genericDao) {
		// TODO Auto-generated constructor stub
		super(genericDao);
		this.subjectDao = (ISubjectDao) genericDao;
	}

}
