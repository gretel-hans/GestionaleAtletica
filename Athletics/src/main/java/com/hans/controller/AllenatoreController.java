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
import com.hans.service.AllenatoreService;

@RestController
@RequestMapping("/athletics/allenatori")
public class AllenatoreController {
	
	@Autowired AllenatoreService allenatoreService;
	
	@GetMapping()
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<List<Allenatore>> cercaTuttiAllenatori() {
		return new ResponseEntity<>(allenatoreService.cercaTuttiAllenatori(),HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> cercaAllenatore(@PathVariable Long id) {
		Allenatore a=allenatoreService.cercaAllenatoreConId(id);
		if(a!=null){
			return new ResponseEntity<>(a,HttpStatus.OK);
		}else{
			return new ResponseEntity<>("ERRORE!! L'allenatore cercato non esiste!",HttpStatus.BAD_REQUEST);
		}
	}

}
