package com.bank.entity;


import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "users")
//@Data
public class User {

		@Id
		@SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1, initialValue = 1001)
		@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
		private Integer id;

		@NotBlank
		@Size(min = 3, message = "first name must contain at least 3 characters")
		@Column(name = "first_name", length = 60)
		private String firstName;

		@NotBlank
		@Column(name = "last_name", length = 30)
		private String lastName;

		@NotEmpty
		private String gender;

		@NotNull
		@Column(name = "date_of_birth")
		private Date dob;

		@NotBlank
		@Email(message = "email is not valid")
		@Size(min = 5, max = 60, message = "Email must be between 5 and 60 characters")
		@Column(length = 60, unique = true)
		private String email;

		@Column(name = "user_name", length = 60, unique = true)
		private String username;

		@NotBlank
		@Column(name = "password", length = 20)
		private String pass;

		private String cpass;

		@NotBlank
		@Column(name = "role", length = 20)
		private String role;

		@NotBlank
		@Column(name = "mobileno", length = 20,unique=true)
		private String mobileno;

		@NotBlank
		@Column(name = "address", length = 255)
		private String address;

		@Column(name = "isactivateaccount", length = 20)
		private boolean isActivateAccount;
		
		@OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
		private Account account;

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public String getFirstName() {
			return firstName;
		}

		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}

		public String getLastName() {
			return lastName;
		}

		public void setLastName(String lastName) {
			this.lastName = lastName;
		}

		public String getGender() {
			return gender;
		}

		public void setGender(String gender) {
			this.gender = gender;
		}

		public Date getDob() {
			return dob;
		}

		public void setDob(Date dob) {
			this.dob = dob;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public String getPass() {
			return pass;
		}

		public void setPass(String pass) {
			this.pass = pass;
		}

		public String getCpass() {
			return cpass;
		}

		public void setCpass(String cpass) {
			this.cpass = cpass;
		}

		public String getRole() {
			return role;
		}

		public void setRole(String role) {
			this.role = role;
		}

		public String getMobileno() {
			return mobileno;
		}

		public void setMobileno(String mobileno) {
			this.mobileno = mobileno;
		}

		public String getAddress() {
			return address;
		}

		public void setAddress(String address) {
			this.address = address;
		}

		public boolean isActivateAccount() {
			return isActivateAccount;
		}

		public void setActivateAccount(boolean isActivateAccount) {
			this.isActivateAccount = isActivateAccount;
		}

		public Account getAccount() {
			return account;
		}

		public void setAccount(Account account) {
			this.account = account;
		}
			
}


