package com.hans.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hans.entity.Comune;
import com.hans.entity.Provincia;
import com.hans.service.ComuneService;
import com.hans.service.ProvinciaService;

@RestController
@RequestMapping("/athletics/indirizzi")
public class IndirizzoController {
	
	@Autowired ComuneService dbComune;
	@Autowired ProvinciaService dbProvincia;
	
	
	@GetMapping("/comuni")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<List<Comune>> listaComuni() {
		return new ResponseEntity<>(dbComune.cercaTuttiComuni(),HttpStatus.OK);
	}
	
	@GetMapping("/province")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<List<Provincia>> autenticatedAccess() {
		return new ResponseEntity<>(dbProvincia.cercaTutteProvince(),HttpStatus.OK);
	}
}
