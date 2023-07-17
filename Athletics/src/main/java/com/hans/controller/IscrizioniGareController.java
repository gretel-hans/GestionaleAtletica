package com.hans.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hans.entity.GaraConcorso;
import com.hans.entity.GaraCorsa;
import com.hans.model.IscrizioneGaraConcorso;
import com.hans.model.IscrizioneGaraCorsa;
import com.hans.service.GaraConcorsoService;
import com.hans.service.GaraCorsaService;

@RestController
@RequestMapping("/athletics/iscrizioni")
public class IscrizioniGareController {

	@Autowired GaraCorsaService garaCorsaService;

	@Autowired GaraConcorsoService garaConcorsoService;

	@PostMapping("/gareCorse")
	@PreAuthorize("hasRole('ALLENATORE')")
	public ResponseEntity<GaraCorsa> iscriviAtletiGaraCorsa(@RequestBody IscrizioneGaraCorsa g) {
		return new ResponseEntity<>(garaCorsaService.iscriviAtleta(g.getGaraCorsa().getId(), g.getAtletiPartecipanti()),HttpStatus.CREATED);
	}

	@PostMapping("/gareConcorsi")
	@PreAuthorize("hasRole('ALLENATORE')")
	public ResponseEntity<GaraConcorso> iscriviAtletiGaraConcorso(@RequestBody IscrizioneGaraConcorso g) {
		return new ResponseEntity<>(garaConcorsoService.iscriviAtleta(g.getGaraConcorso().getId(), g.getAtletiPartecipanti()),HttpStatus.CREATED);
	}

}
