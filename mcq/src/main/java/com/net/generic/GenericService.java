package com.net.generic;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public abstract class GenericService<E, K> implements IGenericService<E, K> {

    private IGenericDao<E, K> genericDao;

    public GenericService(IGenericDao<E,K> genericDao) {
        this.genericDao=genericDao;
    }

    public GenericService() {
    	
    }

    public IGenericDao<E, K> getGenericDao() {
		return genericDao;
	}

	public void setGenericDao(IGenericDao<E, K> genericDao) {
		this.genericDao = genericDao;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
    public void saveOrUpdate(E entity) {
        genericDao.saveOrUpdate(entity);
    }

    @Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public List<E> getAll() {
    	System.out.println("In Generic Class1111");
        return genericDao.getAll();
    }

    @Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public E get(K id) {
        return genericDao.find(id);
    }

    @Override
	@Transactional(propagation = Propagation.REQUIRED)
    public boolean add(E entity) {
        genericDao.add(entity);
		return true;
    }

    @Override
	@Transactional(propagation = Propagation.REQUIRED)
    public void update(E entity) {
        genericDao.update(entity);
    }
    
    @Override
   	@Transactional(propagation = Propagation.REQUIRED)
    public boolean active(E entity) {
    	genericDao.active(entity);
        return true;
    }

    @Override
	@Transactional(propagation = Propagation.REQUIRED)
    public void remove(E entity) {
        genericDao.remove(entity);
    }
}
