package com.net.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.net.dao.ITopicDao;
import com.net.entity.Topic;
import com.net.generic.GenericService;
import com.net.generic.IGenericDao;

public class TopicService extends GenericService<Topic, Integer> implements ITopicService {

	@Autowired
	private ITopicDao topicDao;
	
	public TopicService(@Qualifier("topicDao") IGenericDao<Topic, Integer> genericDao) {
		// TODO Auto-generated constructor stub
		super(genericDao);
		this.topicDao = (ITopicDao) genericDao;
	}
}
