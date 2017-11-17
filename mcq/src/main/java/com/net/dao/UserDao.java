package com.net.dao;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.transaction.annotation.Transactional;

import com.net.entity.Role;
import com.net.entity.UserInfo;
import com.net.entity.UserType;
import com.net.generic.GenericDao;

@Transactional
public class UserDao extends GenericDao<UserInfo, Integer> implements IUserDao {
	
	@Autowired
	private HibernateTemplate hibernateTemplate;
	
	@Autowired
	SessionFactory sessionFactory;

	Session session = null;
	Transaction tx = null;
	
	@Override
	public UserInfo getActiveUser(String userName) {
		UserInfo activeUserInfo = new UserInfo();
		int active = 1;
		System.out.println("Username is:"+userName);
		List<?> list = hibernateTemplate.find("FROM UserInfo WHERE mobile_no=? and active=?",
				userName, active);
		if(!list.isEmpty()) {
			activeUserInfo = (UserInfo)list.get(0);
		}
		return activeUserInfo;
	}
	@Override
	public List<Role> roleUser() {
		
		session = sessionFactory.openSession();
		tx = session.beginTransaction();
		Criteria criteria = session.createCriteria(Role.class);
		List<Role> role = criteria.list();
		return role;
		
	}
	
	@Override
	public List<UserType> getUserType() {
		
		session = sessionFactory.openSession();
		tx = session.beginTransaction();
		Criteria criteria = session.createCriteria(UserType.class);
		List<UserType> userType = criteria.list();
		return userType;
		
	}
}