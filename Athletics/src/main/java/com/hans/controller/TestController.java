package com.hans.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/athletics/test")
public class TestController {
	Logger logger = LoggerFactory.getLogger(this.getClass());

	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}
	
	@GetMapping("/auth")
	@PreAuthorize("isAuthenticated()")
	public String autenticatedAccess() {
		return "Autenticated Content.";
	}
	
	@GetMapping("/atleta")
	@PreAuthorize("hasRole('ATLETA')")
	public String userAccess() {
		return "ATLETA Content.";
	}

	@GetMapping("/allenatore")
	@PreAuthorize("hasRole('ALLENATORE')")
	public String allenatoreAccess() {
		return "ALLENATORE Board.";
	}
	
	@GetMapping("/societa")
	@PreAuthorize("hasRole('SOCIETA')")
	public String moderatorAccess() {
		return "SOCIETA Board.";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}
}
