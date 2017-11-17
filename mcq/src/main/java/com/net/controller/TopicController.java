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

import com.net.entity.Subject;
import com.net.entity.Teacher;
import com.net.entity.Topic;
import com.net.service.ITopicService;

@CrossOrigin
@Controller
@RequestMapping("api/topic")
public class TopicController {

	@Autowired
	private ITopicService topicService;

	//Add Topic
	@PostMapping("addTopic")
	public ResponseEntity<Void> addTopic(@RequestBody Topic topic, UriComponentsBuilder builder) {
		boolean flag = topicService.add(topic);
		if (flag == false) {
			return new ResponseEntity<Void>(HttpStatus.CONFLICT);
		}
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(builder.path("/topic/{id}").buildAndExpand(topic.getTopic_id()).toUri());
		return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}

	// list Subject (Specific)
	@GetMapping("getTopic/{id}")
	public ResponseEntity<Topic> getSubjectById(@PathVariable("id") Integer id) {
		Topic topic = topicService.get(id);
		return new ResponseEntity<Topic>(topic, HttpStatus.OK);
	}

	// list all Subject
	@GetMapping("listAllTopic")
	public ResponseEntity<List<Topic>> getAllTopics() {
		List<Topic> list = topicService.getAll();
		return new ResponseEntity<List<Topic>>(list, HttpStatus.OK);
	}

	/*
	 * @PutMapping("update") public ResponseEntity<Customer>
	 * updateCustomer(@RequestBody Customer customer) {
	 * customerService.update(customer); return new
	 * ResponseEntity<Customer>(customer, HttpStatus.OK); }
	 */
	// delete Subject
	@PutMapping("deleteTopic")
	public ResponseEntity<Void> delete(@RequestBody Topic id) {
		topicService.remove(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	@PostMapping("active")
	public ResponseEntity<Void> active(@RequestBody Topic topic) {
		if(topic.getActive()==1){
			topic.setActive(0);
		}else{
			topic.setActive(1);
		}
		topicService.active(topic);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

}
