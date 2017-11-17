package com.net.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.UriComponentsBuilder;

import com.net.entity.Exam;
import com.net.entity.Teacher;
import com.net.service.IExamService;

@Controller
@RequestMapping("api/exam")
public class ExamController {
	@Autowired
	private IExamService examService;
	
	//***************************CUSTOMER*************************//
	// add Exam
	@CrossOrigin("*")
	@PostMapping("addExam")
	public ResponseEntity<Void> addExam(@RequestBody Exam exam, UriComponentsBuilder builder) {
        boolean flag = examService.add(exam);
        if (flag == false) {
        	return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/exam/{id}").buildAndExpand(exam.getExam_id()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}	
	// list Subject (Specific)	
	@GetMapping("getExam/{id}")
	public ResponseEntity<Exam> getExamById(@PathVariable("id") Integer id) {
		Exam exam = examService.get(id);
		return new ResponseEntity<Exam>(exam, HttpStatus.OK);
	}
	//list all Subject
	@GetMapping("listAllExam")
	public ResponseEntity<List<Exam>> getAllExams() {
		List<Exam> list = examService.getAll();
		return new ResponseEntity<List<Exam>>(list, HttpStatus.OK);
	}
	
	/*@PutMapping("update")
	public ResponseEntity<Customer> updateCustomer(@RequestBody Customer customer) {
		customerService.update(customer);
		return new ResponseEntity<Customer>(customer, HttpStatus.OK);
	}*/
	// delete Subject
	@PutMapping("delete")
	public ResponseEntity<Void> deleteExam(@RequestBody Exam id) {
		examService.remove(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	@PostMapping("active")
	public ResponseEntity<Void> active(@RequestBody Exam exam) {
		if(exam.getActive()==1){
			exam.setActive(0);
		}else{
			exam.setActive(1);
		}
		examService.active(exam);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
}
