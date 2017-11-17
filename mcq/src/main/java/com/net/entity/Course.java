package com.net.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="course_mst")
public class Course {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="course_id")
    private int course_id; 
    private String course_name;
    private String course_language;
    private String course_des;
    private int upd_user_id	;
	private String upd_datetime;
	private int active;
	public int getCourse_id() {
		return course_id;
	}
	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}
	public String getCourse_name() {
		return course_name;
	}
	public void setCourse_name(String course_name) {
		this.course_name = course_name;
	}
	public String getCourse_language() {
		return course_language;
	}
	public void setCourse_language(String course_language) {
		this.course_language = course_language;
	}
	public String getCourse_des() {
		return course_des;
	}
	public void setCourse_des(String course_des) {
		this.course_des = course_des;
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
	
}
