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
@Table(name="exam_mst")
public class Exam {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="exam_id")
    private int exam_id; 
	
	@Column(name="exam_name")
    private String exam_name;
	 
	@ManyToOne
	@JoinColumn(name = "subject_id")
	private Subject subject;
	    
	
    private int question_count;
    private String exam_timing;
    private String remark;
    private int upd_user_id	;
	private String upd_datetime;
	private int active;
	public int getExam_id() {
		return exam_id;
	}
	public void setExam_id(int exam_id) {
		this.exam_id = exam_id;
	}
	public String getExam_name() {
		return exam_name;
	}
	public void setExam_name(String exam_name) {
		this.exam_name = exam_name;
	}
	public Subject getSubject() {
		return subject;
	}
	public void setSubject(Subject subject) {
		this.subject = subject;
	}
	public int getQuestion_count() {
		return question_count;
	}
	public void setQuestion_count(int question_count) {
		this.question_count = question_count;
	}
	public String getExam_timing() {
		return exam_timing;
	}
	public void setExam_timing(String exam_timing) {
		this.exam_timing = exam_timing;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
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
