package com.net.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;

import org.apache.tomcat.jni.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.UriComponentsBuilder;


import com.net.entity.Role;
import com.net.entity.UserInfo;
import com.net.entity.UserType;
import com.net.service.IUserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Controller
@CrossOrigin
@RequestMapping("api/user")
public class UserController {

	@Autowired
	private IUserService userService;
	PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	/*@GetMapping("login")
	public ResponseEntity<String> login(@RequestParam("username") String username,@RequestParam("password") String password) throws ServletException {
		HttpHeaders headers = new HttpHeaders();
		String jwtToken = "";

		if (username == null ||password == null) {
			throw new ServletException("Please fill in username and password");
		}

	//	String username = login.getUserName();
	//	String password = login.getPassword();

		UserInfo user = userService.findByUsername(username);

		if (user == null) {
			throw new ServletException("Username not found.");
		}

		String pwd = user.getPassword();

		if (!password.equals(pwd)) {
			throw new ServletException("Invalid login. Please check your name and password.");
		}

		jwtToken = Jwts.builder().setSubject(username).claim("roles", "user").setIssuedAt(new Date())
				.signWith(SignatureAlgorithm.HS256, "secretkey").compact();
		headers.add("Authorization", "Bearer " + jwtToken);
		return new ResponseEntity<String>(jwtToken,headers, HttpStatus.OK);
	}*/
	
	@PostMapping("login")
	public ResponseEntity<UserInfo> login(@RequestBody UserInfo login) throws ServletException {
		HttpHeaders headers = new HttpHeaders();
		String jwtToken = "";

		if (login.getMobile_no() == null ||login.getPassword() == null) {
			throw new ServletException("Please fill in username and password");
		}

	//	String username = login.getUserName();
	//	String password = login.getPassword();

		UserInfo user = userService.findByUsername(login.getMobile_no());

		if (user == null) {
			throw new ServletException("Username not found.");
		}

		String pwd = user.getPassword();
		
		if (!passwordEncoder.matches(login.getPassword(), user.getPassword())) {
			throw new ServletException("Invalid login. Please check your name and password.");
		}

		/*if (!login.getPassword().equals(pwd)) {
			throw new ServletException("Invalid login. Please check your name and password.");
		}
		*/
		jwtToken = Jwts.builder().setSubject(login.getMobile_no()).claim("roles", "user").setIssuedAt(new Date())
				.signWith(SignatureAlgorithm.HS256, "secretkey").compact();
		headers.add("Authorization", "Bearer " + jwtToken);
		return new ResponseEntity<UserInfo>(user,HttpStatus.OK);
	}
	@CrossOrigin("*")
	@PostMapping("create")
	public ResponseEntity<Void> addUserInfo(@RequestBody UserInfo userInfo, UriComponentsBuilder builder) {
		
		UserInfo user= new UserInfo();
	    user.setUser_id(userInfo.getUser_id());
	    user.setFname(userInfo.getFname());
	    user.setLname(userInfo.getLname());
	    user.setGender(userInfo.getGender());
	    user.setEmail(userInfo.getEmail());
	    user.setMobile_no(userInfo.getMobile_no());
	    user.setRole(userInfo.getRole());
	    user.setUpd_datetime(userInfo.getUpd_datetime());
	    user.setUpd_user_id(userInfo.getUser_id());
	    user.setUsertype_spe_id(userInfo.getUsertype_spe_id());
	    user.setUserType(userInfo.getUserType());
	    user.setActive(userInfo.getActive());
	    user.setPassword(passwordEncoder.encode(userInfo.getPassword()));
	    		    
        boolean flag = userService.add(user);
        if (flag == false) {
        	return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/user/{id}").buildAndExpand(user.getUser_id()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}
	
	@GetMapping("list")
	public ResponseEntity<List<UserInfo>> getAll() {
		List<UserInfo> list = userService.getAll();
		return new ResponseEntity<List<UserInfo>>(list, HttpStatus.OK);
	}
	@RequestMapping(value = "/role", method = RequestMethod.GET)
	public @ResponseBody
	List<Role> role() {
		List<Role> roleList = null;
		try {
			roleList = userService.getRoles();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return roleList;
	}
	
	@RequestMapping(value = "/user_type", method = RequestMethod.GET)
	public @ResponseBody
	List<UserType> getUserType() {
		List<UserType> userTypeList = null;
		try {
			userTypeList = userService.getUserType();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userTypeList;
	}
	@PutMapping("delete")
	public ResponseEntity<Void> deleteUserInfo(@RequestBody UserInfo id) {
		userService.remove(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	@PostMapping("active")
	public ResponseEntity<Void> active(@RequestBody UserInfo user) {
		if(user.getActive()==1){
			user.setActive(0);
		}else{
			user.setActive(1);
		}
		userService.active(user);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	
}
