package com.net.generic;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;


import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

/**
 * Basic DAO operations dependent with Hibernate's specific classes
 * @see SessionFactory
 */
@SuppressWarnings("unchecked")
public class GenericDao<E, K extends Serializable> implements IGenericDao<E, K> {
   
	/**
	 * persistence type
	 */
	private Class<E> type;
	
	@Autowired
	private HibernateTemplate  hibernateTemplate;	
	
    /**
     * By defining this class as abstract, we prevent Spring from creating instance of this class
     * If not defined abstract getClass().getGenericSuperClass() would return Object.
     * There would be exception because Object class does not hava constructor with parameters.
     */

	public GenericDao() {
		Type t = getClass().getGenericSuperclass();
        ParameterizedType pt = (ParameterizedType) t;
        type = (Class<E>) pt.getActualTypeArguments()[0];
    }

    @Override
	public void add(E entity) {
    	hibernateTemplate.saveOrUpdate(entity);
    	
    }

    @Override
	public void saveOrUpdate(E entity) {
    	hibernateTemplate.saveOrUpdate(entity);
    }

    @Override
	public void update(E entity) {
    	hibernateTemplate.update(entity);
    }

    @Override
	public void remove(E entity) {
    	hibernateTemplate.delete(entity);
    }

    @Override
   	public void active(E entity) {
       	hibernateTemplate.saveOrUpdate(entity);
    }
    
    @Override
	public E find(K key) {
    	return (E) hibernateTemplate.get(type, key);
    }

    @Override
	public List<E> getAll(){
    	return (List<E>) hibernateTemplate.find("from "+type.getName());
    }
    
    /**
	 * @return the type
	 */
	public Class<E> getType() {
		return type;
	}

	/**
	 * @param type the type to set
	 */
	public void setType(Class<E> type) {
		this.type = type;
	}
}