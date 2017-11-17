package com.net.dao;
import java.util.List;

import com.net.entity.Role;
import com.net.entity.UserInfo;
import com.net.entity.UserType;
import com.net.generic.IGenericDao;

public interface IUserDao extends IGenericDao<UserInfo, Integer> {
	UserInfo getActiveUser(String userName);

	public List<Role> roleUser();
	public List<UserType> getUserType();
}