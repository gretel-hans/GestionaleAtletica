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

import com.hans.entity.Atleta;
import com.hans.service.AtletaService;

@RestController
@RequestMapping("/athletics/atleti")
public class AtletaController {
	
	@Autowired AtletaService atletaService;
	
	@GetMapping()
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<List<Atleta>> cercaTuttiAtleti() {
		return new ResponseEntity<>(atletaService.cercaTuttiAtleti(),HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Atleta> cercaAtletaConId(@PathVariable Long id) {
		return new ResponseEntity<>(atletaService.cercaAtletaConId(id),HttpStatus.OK);
	}

}
