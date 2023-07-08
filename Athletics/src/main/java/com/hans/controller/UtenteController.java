package com.hans.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hans.entity.Utente;
import com.hans.service.UtenteService;

@RestController
@RequestMapping("/athletics/utenti")
public class UtenteController {
	
	@Autowired UtenteService dbUtente;
	
	
	@GetMapping()
	public ResponseEntity<List<Utente>> listaUtenti() {
		return new ResponseEntity<>(dbUtente.cercaTuttiUtenti(),HttpStatus.OK);
	}
	
	
}
