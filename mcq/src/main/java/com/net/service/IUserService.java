package com.net.service;

import java.util.List;

import com.net.entity.Role;
import com.net.entity.UserInfo;
import com.net.entity.UserType;
import com.net.generic.IGenericService;


public interface IUserService extends IGenericService<UserInfo, Integer> {

	UserInfo findByUsername(String username);
	public List<Role> getRoles();
	public List<UserType> getUserType();
	UserInfo getActiveUser(String userName);
	
	
}
