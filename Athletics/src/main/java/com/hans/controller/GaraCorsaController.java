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

import com.hans.entity.GaraCorsa;
import com.hans.service.GaraCorsaService;

@RestController
@RequestMapping("/athletics/garaCorsa")
public class GaraCorsaController {

	@Autowired GaraCorsaService garaCorsaService;
	
	@GetMapping()
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<List<GaraCorsa>> cercaTutteGareCorse() {
		return new ResponseEntity<>(garaCorsaService.cercaTutteGareCorse(),HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<GaraCorsa> cercaGaraCorsaConId(@PathVariable Long id) {
		return new ResponseEntity<>(garaCorsaService.cercaGaraCorsaConId(id),HttpStatus.OK);
	}

}
