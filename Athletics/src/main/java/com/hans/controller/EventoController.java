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

import com.hans.entity.Allenatore;
import com.hans.entity.Atleta;
import com.hans.entity.Evento;
import com.hans.service.AllenatoreService;
import com.hans.service.AtletaService;
import com.hans.service.EventoService;

@RestController
@RequestMapping("/athletics/eventi")
public class EventoController {
	
	@Autowired EventoService eventoService;
	
	@GetMapping()
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<List<Evento>> cercaTuttiEventi() {
		return new ResponseEntity<>(eventoService.cercaTuttiEventi(),HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Evento> cercaEvento(@PathVariable Long id) {
		return new ResponseEntity<>(eventoService.cercaEventoConId(id),HttpStatus.OK);
	}
	
	@PostMapping()
	@PreAuthorize("hasRole('SOCIETA')")
	public ResponseEntity<Evento> creaEvento(@RequestBody Evento e) {
		eventoService.salvaEvento(e);
		return new ResponseEntity<>(eventoService.cercaEventoConId(e.getId()),HttpStatus.CREATED);
	}

}
