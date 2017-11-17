package com.net.generic;
import java.util.List;

/**
 *  
 * @param <E>
 * @param <K>
 */
public interface IGenericDao<E,K> {
    public void add(E entity) ;
    public void saveOrUpdate(E entity) ;
    public void update(E entity) ;
    public void remove(E entity);
    public void active(E entity);
    public E find(K key);
    public List<E> getAll();
}