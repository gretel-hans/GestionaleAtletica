package com.hans.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hans.entity.Utente;
import com.hans.model.UsernameToken;
import com.hans.security.JwtTokenProvider;
import com.hans.service.UtenteService;


@RestController
@RequestMapping("/athletics/utenti")
public class UtenteController {
	
	@Autowired UtenteService dbUtente;
	@Autowired JwtTokenProvider dbToken;
	
	
	@GetMapping()
	public ResponseEntity<List<Utente>> listaUtenti() {
		return new ResponseEntity<>(dbUtente.cercaTuttiUtenti(),HttpStatus.OK);
	}

	@PostMapping("/{token}")
	public ResponseEntity<Utente> cercaUtenteConEmail(@PathVariable String token) {
		String email=dbToken.getUsername(token);
		return new ResponseEntity<>(dbUtente.cercaUtenteConEmail(email),HttpStatus.OK);
	}

	@PostMapping("/verifica")
	public ResponseEntity<?> verificaUtente(@RequestBody UsernameToken ut) {
		Utente utente=dbUtente.verificaUtente(ut);
		if(utente!=null){
			return new ResponseEntity<>(utente,HttpStatus.OK);
		}else
		return new ResponseEntity<>("Verifica dell'utente non andata a buon fine",HttpStatus.BAD_REQUEST);
	}


	
}
