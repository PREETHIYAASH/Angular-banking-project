package com.bank.service;

import java.util.List;

import com.bank.entity.User;

public interface UserService {
	public User getUserById(Integer id);
	public User registerUser(User user);
	public void deleteUserById(Integer id);
    public List<User> getAllUsers();
    public User loginUser(User user);
    public User updateByUserName(String username, User user);
    List<User> searchUsers(String searchText);
    public User updateUserInformation( Integer id, User user);
    public User activateUserInformation(Integer id, User user);
    
}
