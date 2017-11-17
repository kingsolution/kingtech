package com.net.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="teacher_mst")
public class Teacher {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="teacher_id")
    private int teacher_id; 
	private String fname;
	private String lname; 
	private String date_of_birth; 
	private String gender; 
	private String education; 
	private String email;
	private String mob_no; 
	private String address; 
	private String city; 
	private String teaching_yr; 
	private int upd_user_id	;
	private String upd_datetime;
	private int active;
	public int getTeacher_id() {
		return teacher_id;
	}
	public void setTeacher_id(int teacher_id) {
		this.teacher_id = teacher_id;
	}
	public String getFname() {
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	public String getLname() {
		return lname;
	}
	public void setLname(String lname) {
		this.lname = lname;
	}
	public String getDate_of_birth() {
		return date_of_birth;
	}
	public void setDate_of_birth(String date_of_birth) {
		this.date_of_birth = date_of_birth;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getEducation() {
		return education;
	}
	public void setEducation(String education) {
		this.education = education;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMob_no() {
		return mob_no;
	}
	public void setMob_no(String mob_no) {
		this.mob_no = mob_no;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getTeaching_yr() {
		return teaching_yr;
	}
	public void setTeaching_yr(String teaching_yr) {
		this.teaching_yr = teaching_yr;
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
