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

import com.net.entity.Student;
import com.net.entity.Subject;
import com.net.entity.Teacher;
import com.net.service.ISubjectService;

@Controller
@RequestMapping("api/subject")
public class SubjectController {
	@Autowired
	private ISubjectService subjectService;
	
	//***************************CUSTOMER*************************//
	// add Subject
	@CrossOrigin("*")
	@PostMapping("addSubject")
	public ResponseEntity<Void> addSubject(@RequestBody Subject subject, UriComponentsBuilder builder) {
        boolean flag = subjectService.add(subject);
        if (flag == false) {
        	return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/subject/{id}").buildAndExpand(subject.getSubject_id()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}	
	// list Subject (Specific)	
	@GetMapping("getSubject/{id}")
	public ResponseEntity<Subject> getSubjectById(@PathVariable("id") Integer id) {
		Subject subject = subjectService.get(id);
		return new ResponseEntity<Subject>(subject, HttpStatus.OK);
	}
	//list all Subject
	@GetMapping("listAllSubject")
	public ResponseEntity<List<Subject>> getAllSubjects() {
		List<Subject> list = subjectService.getAll();
		return new ResponseEntity<List<Subject>>(list, HttpStatus.OK);
	}
	
	/*@PutMapping("update")
	public ResponseEntity<Customer> updateCustomer(@RequestBody Customer customer) {
		customerService.update(customer);
		return new ResponseEntity<Customer>(customer, HttpStatus.OK);
	}*/
	// delete Subject
	@PutMapping("delete")
	public ResponseEntity<Void> delete(@RequestBody Subject id) {
		subjectService.remove(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	@PostMapping("active")
	public ResponseEntity<Void> active(@RequestBody Subject subject) {
		if(subject.getActive()==1){
			subject.setActive(0);
		}else{
			subject.setActive(1);
		}
		subjectService.active(subject);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	
	 
	
	
	
	
}
