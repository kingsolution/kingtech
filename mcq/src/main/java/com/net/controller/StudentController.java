package com.net.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.UriComponentsBuilder;

import com.net.entity.Question;
import com.net.entity.Student;
import com.net.service.IStudentService;

@Controller
@RequestMapping("api/student")
public class StudentController {
	@Autowired
	private IStudentService studentService;
	
	@CrossOrigin("*")
	@PostMapping("addStudent")
	public ResponseEntity<Void> addStudent(@RequestBody Student student, UriComponentsBuilder builder) {
        boolean flag = studentService.add(student);
        if (flag == false) {
        	return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/student/{id}").buildAndExpand(student.getStudent_id()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}
	
	
	@GetMapping("get/{id}")
	public ResponseEntity<Student> getStudentById(@PathVariable("id") Integer id) {
		Student student = studentService.get(id);
		return new ResponseEntity<Student>(student, HttpStatus.OK);
	}
	
	@CrossOrigin("*")
	@GetMapping("listAllStudent")
	public ResponseEntity<List<Student>> getAllStudents() {
		List<Student> list = studentService.getAll();
		return new ResponseEntity<List<Student>>(list, HttpStatus.OK);
	}
	
	@GetMapping("getMaxStudent")
	public ResponseEntity<Student> getMaxStudent() {
		Student student = studentService.getMaxStudent();
		return new ResponseEntity<Student>(student, HttpStatus.OK);
	}
	@PutMapping("update")
	public ResponseEntity<Student> updateStudent(@RequestBody Student student) {
		studentService.update(student);
		return new ResponseEntity<Student>(student, HttpStatus.OK);
	}
	@PutMapping("delete")
	public ResponseEntity<Void> deleteStudent(@RequestBody Student id) {
		studentService.remove(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	@PostMapping("active")
	public ResponseEntity<Void> active(@RequestBody Student student) {
		if(student.getActive()==1){
			student.setActive(0);
		}else{
			student.setActive(1);
		}
		studentService.active(student);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
}
