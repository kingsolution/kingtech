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
import com.net.entity.Course;

import com.net.entity.Exam;
import com.net.entity.Student;
import com.net.service.ICourseService;

@Controller
@RequestMapping("api/course")
public class CourseController {
	@Autowired
	private ICourseService courseService;
	
	@CrossOrigin("*")
	@GetMapping("listAllCourse")
	public ResponseEntity<List<Course>> getAllCourses() {
		List<Course> list = courseService.getAll();
		return new ResponseEntity<List<Course>>(list, HttpStatus.OK);
	}
	
	@CrossOrigin("*")
	@PostMapping("addCourse")
	public ResponseEntity<Void> addCourse(@RequestBody Course course, UriComponentsBuilder builder) {
        boolean flag = courseService.add(course);
        if (flag == false) {
        	return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/course/{id}").buildAndExpand(course.getCourse_id()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}	
	@PutMapping("delete")
	public ResponseEntity<Void> deleteCourse(@RequestBody Course id) {
		courseService.remove(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}	
	
	@PostMapping("active")
	public ResponseEntity<Void> activeDistrict(@RequestBody Course course) {
		if(course.getActive()==1){
			course.setActive(0);
		}else{
			course.setActive(1);
		}
		courseService.active(course);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
}
