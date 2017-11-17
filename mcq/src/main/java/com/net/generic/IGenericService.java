package com.net.generic;

import java.util.List;

/**
 * Generic Service
 */
public interface IGenericService<E, K> {
    
	public void saveOrUpdate(E entity);

    public List<E> getAll();

    public E get(K id);

    public boolean add(E entity);

    public void update(E entity);
    public boolean active(E entity);

    public void remove(E entity);
}
