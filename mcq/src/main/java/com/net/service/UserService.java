package com.net.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.net.dao.IUserDao;
import com.net.entity.Role;
import com.net.entity.UserInfo;
import com.net.entity.UserType;
import com.net.generic.GenericService;
import com.net.generic.IGenericDao;

public class UserService extends GenericService<UserInfo, Integer> implements IUserService,UserDetailsService {

	@Autowired
	private IUserDao userDao;
	
	public UserService(@Qualifier("userDao") IGenericDao<UserInfo, Integer> genericDao) {
		// TODO Auto-generated constructor stub
		super(genericDao);
		this.userDao = (IUserDao) genericDao;
	}
	
	public UserInfo findByUsername(String username) {
		// TODO Auto-generated method stub
		return userDao.getActiveUser(username);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		UserInfo activeUserInfo = userDao.getActiveUser(username);
		GrantedAuthority authority = new SimpleGrantedAuthority(activeUserInfo.getRole().getRole_name());
		UserDetails userDetails = (UserDetails)new User(activeUserInfo.getMobile_no(),
				activeUserInfo.getPassword(), Arrays.asList(authority));
		return userDetails;
	}

	@Override
	public List<Role> getRoles() {
		// TODO Auto-generated method stub
		return userDao.roleUser();
	}

	@Override
	public List<UserType> getUserType() {
		// TODO Auto-generated method stub
		return userDao.getUserType();
	}

	@Override
	public UserInfo getActiveUser(String userName) {
		// TODO Auto-generated method stub
		return userDao.getActiveUser(userName);
	}

}
