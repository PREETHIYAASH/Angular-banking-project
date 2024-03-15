package com.bank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.bank.entity.User;
import com.bank.service.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
     
	@Autowired
	private final UserService userService;//service object

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping ("/register")
	public ResponseEntity<User> registerUser(@RequestBody User user) {
		return new ResponseEntity<User>(userService.registerUser(user), HttpStatus.CREATED);
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Integer id) {
		User user = userService.getUserById(id);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteUserById(@PathVariable Integer id) {
		userService.deleteUserById(id);
		return new ResponseEntity<String>("The User is deleted successfully", HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<User>> getAllUsers() {
		List<User> users = userService.getAllUsers();
		return new ResponseEntity<>(users, HttpStatus.OK);
	}


	@PostMapping("login")
	public ResponseEntity<User> loginUser(@RequestBody User user) {
		return new ResponseEntity<User>(this.userService.loginUser(user), HttpStatus.OK);
	}
	//forgot password
	@PutMapping("/{username}/updateUsername")
	public ResponseEntity<User> updateByUserName(@PathVariable String username, @RequestBody User user) {
		return new ResponseEntity<User>(userService.updateByUserName(username, user), HttpStatus.OK);
	}

	@GetMapping("/search")
	public ResponseEntity<List<User>> searchUsers(@RequestParam String searchText) {
		List<User> searchResults = userService.searchUsers(searchText);
		return ResponseEntity.ok(searchResults);
	}

	@PutMapping("/{id}/update")
	public ResponseEntity<User> updateUserInfo(@PathVariable Integer id, @RequestBody User user) {
		return new ResponseEntity<User>(userService.updateUserInformation(id, user), HttpStatus.OK);
	}
	
	@PutMapping("/{id}/activateAccount")
	public ResponseEntity<User> activateAccount(@PathVariable Integer id, @RequestBody User user) {
		return new ResponseEntity<User>(userService.activateUserInformation(id, user), HttpStatus.OK);
	}
}