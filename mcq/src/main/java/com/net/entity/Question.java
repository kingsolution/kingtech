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
@Table(name="question_mst")
public class Question {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="question_id")
    private int question_id; 
	
	@Column(name="question_name")
    private String question_name;
	    
	    @ManyToOne
	    @JoinColumn(name = "topic_id	")
	    private Topic topic;
	    private String option_a;
        private String option_b;
	    private String option_c;
	    private String option_d;
	    private String right_option;
	    private String remark;
	    private int upd_user_id	;
		private String upd_datetime;
		private int active;
		public int getQuestion_id() {
			return question_id;
		}
		public void setQuestion_id(int question_id) {
			this.question_id = question_id;
		}
		public String getQuestion_name() {
			return question_name;
		}
		public void setQuestion_name(String question_name) {
			this.question_name = question_name;
		}
		
		public Topic getTopic() {
			return topic;
		}
		public void setTopic(Topic topic) {
			this.topic = topic;
		}
		public String getOption_a() {
			return option_a;
		}
		public void setOption_a(String option_a) {
			this.option_a = option_a;
		}
		public String getOption_b() {
			return option_b;
		}
		public void setOption_b(String option_b) {
			this.option_b = option_b;
		}
		public String getOption_c() {
			return option_c;
		}
		public void setOption_c(String option_c) {
			this.option_c = option_c;
		}
		public String getOption_d() {
			return option_d;
		}
		public void setOption_d(String option_d) {
			this.option_d = option_d;
		}
		public String getRight_option() {
			return right_option;
		}
		public void setRight_option(String right_option) {
			this.right_option = right_option;
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
