package com.hans.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hans.entity.Allenatore;
import com.hans.entity.Atleta;
import com.hans.entity.Societa;
import com.hans.service.AllenatoreService;
import com.hans.service.AtletaService;
import com.hans.service.SocietaService;

@RestController
@RequestMapping("/athletics/societa")
public class SocietaController {
	
	@Autowired SocietaService societaService;
	
	@GetMapping()
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<List<Societa>> cercaTutteSocieta() {
		return new ResponseEntity<>(societaService.cercaTutteSocieta(),HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Societa> cercaAllenatore(@PathVariable Long id) {
		return new ResponseEntity<>(societaService.cercaSocietaConId(id),HttpStatus.OK);
	}

}
