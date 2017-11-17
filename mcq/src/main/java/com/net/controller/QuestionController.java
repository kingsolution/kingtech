package com.net.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.UriComponentsBuilder;

import com.net.entity.Exam;
import com.net.entity.Question;
import com.net.service.IQuestionService;



@Controller
@RequestMapping("api/question")
public class QuestionController {
	@Autowired
	private IQuestionService questionService;
	
	
	@PostMapping("create")
	public ResponseEntity<Void> addQuestion(@RequestBody Question question, UriComponentsBuilder builder) {
        boolean flag = questionService.add(question);
        if (flag == false) {
        	return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/question/{id}").buildAndExpand(question.getQuestion_id()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}
	
	@GetMapping("get/{id}")
	public ResponseEntity<Question> getQuestionById(@PathVariable("id") Integer id) {
		Question question = questionService.get(id);
		return new ResponseEntity<Question>(question, HttpStatus.OK);
	}
	
	@GetMapping("listAllQuestion")
	public ResponseEntity<List<Question>> getAllQuestions() {
		List<Question> list = questionService.getAll();
		return new ResponseEntity<List<Question>>(list, HttpStatus.OK);
	}
	
	@PutMapping("update")
	public ResponseEntity<Question> updateQuestion(@RequestBody Question question) {
		questionService.update(question);
		return new ResponseEntity<Question>(question, HttpStatus.OK);
	}
	@PutMapping("delete")
	public ResponseEntity<Void> deleteQuestion(@RequestBody Question id) {
		questionService.remove(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	@PostMapping("active")
	public ResponseEntity<Void> active(@RequestBody Question question) {
		if(question.getActive()==1){
			question.setActive(0);
		}else{
			question.setActive(1);
		}
		questionService.active(question);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
}
