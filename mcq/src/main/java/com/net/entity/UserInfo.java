package com.net.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
@Entity
@Table(name="user_mst")
public class UserInfo implements Serializable {
	/**
	 * Auther: Praful Sable
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name="user_id")
	private int user_id;
	
	@Column(name="fname")
	private String fname;
	
	@Column(name="lname")
	private String lname;
	
	@Column(name="gender")
	private String gender;
	
	@Column(name="email")
	private String email;
	
	@Column(name="mobile_no")
	private String mobile_no;
	
	@Column(name="password")
	private String password;

	  @ManyToOne
	    @JoinColumn(name = "role_id")
	    private Role role;
    
	  @ManyToOne
    @JoinColumn(name = "user_type_id")
    private UserType userType;
    
    private int usertype_spe_id	;
    
    private String address;
   /* private String user_type;*/
	private int upd_user_id;
    private String upd_datetime;
    private int active;
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
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
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getMobile_no() {
		return mobile_no;
	}
	public void setMobile_no(String mobile_no) {
		this.mobile_no = mobile_no;
	}
	
	
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	
	public UserType getUserType() {
		return userType;
	}
	public void setUserType(UserType userType) {
		this.userType = userType;
	}
	public int getUsertype_spe_id() {
		return usertype_spe_id;
	}
	public void setUsertype_spe_id(int usertype_spe_id) {
		this.usertype_spe_id = usertype_spe_id;
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
    
   
 
}
