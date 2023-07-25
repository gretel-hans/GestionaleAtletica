package com.hans.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	public ResponseEntity<?> cercaAtletaConId(@PathVariable Long id) {
		Atleta a=atletaService.cercaAtletaConId(id);
		if(a!=null){
			return new ResponseEntity<>(a,HttpStatus.OK);
		}else{
			return new ResponseEntity<>("ERRORE!! L'atleta cercato non esiste!",HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/cercaAtletiConS")
	@PreAuthorize("hasRole('ALLENATORE')")
	public ResponseEntity<List<Atleta>> cercaAtletiConSocieta(@RequestBody String c) {
		return new ResponseEntity<>(atletaService.cercaAtletiConSocieta(c),HttpStatus.OK);
	}

}
