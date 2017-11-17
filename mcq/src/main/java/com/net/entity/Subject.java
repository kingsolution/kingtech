package com.net.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="subject_mst")
public class Subject {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="subject_id")
    private int subject_id; 
	
	@Column(name="subject_name")
    private String subject_name;  
	@Column(name="sub_language")
    private String sub_language;
	@Column(name="subject_description")
    private String subject_description;
	
	@ManyToOne
	@JoinColumn(name = "course_id")
	private Course course;
	
	private int upd_user_id	;
	private String upd_datetime;
	private int active;
	public int getSubject_id() {
		return subject_id;
	}
	public void setSubject_id(int subject_id) {
		this.subject_id = subject_id;
	}
	
	public String getSubject_name() {
		return subject_name;
	}
	public void setSubject_name(String subject_name) {
		this.subject_name = subject_name;
	}
	
	
	public String getSub_language() {
		return sub_language;
	}
	public void setSub_language(String sub_language) {
		this.sub_language = sub_language;
	}
	public String getSubject_description() {
		return subject_description;
	}
	public void setSubject_description(String subject_description) {
		this.subject_description = subject_description;
	}
	public int getUpd_user_id() {
		return upd_user_id;
	}
	public void setUpd_user_id(int upd_user_id) {
		this.upd_user_id = upd_user_id;
	}
	public String getUpd_datetime() {
		return upd_datetime;
	}
	public void setUpd_datetime(String upd_datetime) {
		this.upd_datetime = upd_datetime;
	}
	
	public int getActive() {
		return active;
	}
	public void setActive(int active) {
		this.active = active;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public Course getCourse() {
		return course;
	}
	public void setCourse(Course course) {
		this.course = course;
	}
	
	
}
