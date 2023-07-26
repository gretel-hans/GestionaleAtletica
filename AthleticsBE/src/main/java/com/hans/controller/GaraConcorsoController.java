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

import com.hans.entity.GaraConcorso;
import com.hans.service.GaraConcorsoService;

@RestController
@RequestMapping("/athletics/garaConcorso")
public class GaraConcorsoController {

	@Autowired GaraConcorsoService garaConcorsoService;
	
	@GetMapping()
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<List<GaraConcorso>> cercaTutteGareConcorsi() {
		return new ResponseEntity<>(garaConcorsoService.cercaTutteGaraConcorsi(),HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<GaraConcorso> cercaGaraConcorsoConId(@PathVariable Long id) {
		return new ResponseEntity<>(garaConcorsoService.cercaGaraConcorsoConId(id),HttpStatus.OK);
	}

}
