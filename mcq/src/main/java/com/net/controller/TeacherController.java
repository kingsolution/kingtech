package com.net.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.UriComponentsBuilder;

import com.net.entity.Student;
import com.net.entity.Teacher;
import com.net.generic.GenericService;

import com.net.service.ITeacherService;
@Controller
@RequestMapping("api/teacher")
public class TeacherController{
	@Autowired
	private ITeacherService teacherService;
	
	@GetMapping("listAllTeacher")
	public ResponseEntity<List<Teacher>> getAllTeachers() {
		List<Teacher> list = teacherService.getAll();
		return new ResponseEntity<List<Teacher>>(list, HttpStatus.OK);
	}
	
	@CrossOrigin("*")
	@PostMapping("addTeacher")
	public ResponseEntity<Void> addTeacher(@RequestBody Teacher teacher, UriComponentsBuilder builder) {
        boolean flag = teacherService.add(teacher);
        if (flag == false) {
        	return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/teacher/{id}").buildAndExpand(teacher.getTeacher_id()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}
	@PutMapping("delete")
	public ResponseEntity<Void> deleteTeacher(@RequestBody Teacher id) {
		teacherService.remove(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	@PostMapping("active")
	public ResponseEntity<Void> active(@RequestBody Teacher teacher) {
		if(teacher.getActive()==1){
			teacher.setActive(0);
		}else{
			teacher.setActive(1);
		}
		teacherService.active(teacher);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
}
