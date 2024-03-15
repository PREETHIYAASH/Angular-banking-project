package com.bank.serviceimplementation;
	import java.util.List;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Service;
	
    import com.bank.service.UserService;
import com.bank.entity.Account;
import com.bank.entity.User;
    import com.bank.exception.UserNotFoundException;
    import com.bank.repository.UserRepository;
    import com.bank.service.AccountService;

	@Service
	public class UserServiceImpl implements UserService {
		@Autowired
		private final UserRepository userRepository;
		@Autowired
		private AccountService accountService;

		public UserServiceImpl(UserRepository userRepository) {
			this.userRepository = userRepository;
		}

		@Override
		public void deleteUserById(Integer id) {
			if (!userRepository.existsById(id)) {
				throw new UserNotFoundException("User Id " + id + "  doesn't exist!");
			}
			userRepository.deleteById(id);
		}

		@Override
		public List<User> getAllUsers() {
			return userRepository.findAll();
		}

		@Override
		public User getUserById(Integer id) {
			return userRepository.findById(id)
					.orElseThrow(() -> new UserNotFoundException("User Id " + id + " doesn't exist!"));
		}

		@Override
		public User loginUser(User user) {
			User loggedInUser = userRepository.findByUsernameAndPass(user.getUsername(), user.getPass());
			if (loggedInUser == null) {
				throw new UserNotFoundException("Invalid username or password");
			}
			return loggedInUser;
		}

		@Override
		public User registerUser(User user) {
			if (user.getPass().equals(user.getCpass())) {
				if (user.getRole().equals("admin")) {
					user.setActivateAccount(true);
				} else {
					user.setActivateAccount(false);
				}
				User savedUser = userRepository.save(user);
				if (user.isActivateAccount()) {
					activateuser(savedUser);
				}
				return savedUser;
			} else {
				return null;
			}
		}

		public User updateUsernameById(Integer id, User user) {
			User uuser = userRepository.findById(id)
					.orElseThrow(() -> new UserNotFoundException("User Id " + id + " doesn't exist!"));
			uuser.setUsername(user.getUsername());
			return userRepository.save(uuser);
		}

		@Override
		public User updateByUserName(String username, User user) {
			User puser = userRepository.findByUsername(username);
			if (puser == null) {
				throw new UserNotFoundException("Username " + username + " does not exist!");
			}
			puser.setPass(user.getPass());
			puser.setCpass(user.getCpass());
			return userRepository.save(puser);
		}

		@Override
		public List<User> searchUsers(String searchText) {
			return userRepository.findByFirstNameContainingIgnoreCase(searchText);
		}

		@Override
		public User updateUserInformation(Integer id, User user) {
			User muser = userRepository.findById(id)
					.orElseThrow(() -> new UserNotFoundException("User Id " + id + " doesn't exist!"));
			muser.setEmail(user.getEmail());
			muser.setDob(user.getDob());
			muser.setFirstName(user.getFirstName());
			muser.setGender(user.getGender());
			muser.setLastName(user.getLastName());
			muser.setAddress(user.getAddress());
			muser.setActivateAccount(user.isActivateAccount());
			return userRepository.save(muser);
		}
		
		@Override
		public User activateUserInformation(Integer id, User user) {
			User muser = userRepository.findById(id)
					.orElseThrow(() -> new UserNotFoundException("User Id " + id + " doesn't exist!"));
			muser.setEmail(user.getEmail());
			muser.setDob(user.getDob());
			muser.setFirstName(user.getFirstName());
			muser.setGender(user.getGender());
			muser.setLastName(user.getLastName());
			muser.setAddress(user.getAddress());
			muser.setActivateAccount(user.isActivateAccount());
			User us = userRepository.save(muser);
			return activateuser(us);
		}
		
		public User activateuser(User user) {
			Account account = new Account();
			account.setUser(user);
			accountService.createAccount(account);
			return user;
		}
	}
              