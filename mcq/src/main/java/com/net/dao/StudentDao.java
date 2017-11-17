package com.net.dao;

import javax.transaction.Transactional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;

import com.net.entity.Student;
import com.net.generic.GenericDao;

@Transactional
public class StudentDao  extends GenericDao<Student,Integer> implements IStudentDao{
	@Autowired
	private HibernateTemplate  hibernateTemplate;

	@Override
	public Student getMaxStudent() {
		// TODO Auto-generated method stub
		List<Student> list = (List<Student>) hibernateTemplate.find("from Student order by student_id DESC");
		return (Student) list.get(0);
	}

	
	
	

	
}
