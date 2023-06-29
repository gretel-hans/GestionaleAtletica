package com.hans.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hans.entity.Indirizzo;
import com.hans.repository.IndirizzoRepository;

@Service
public class IndirizzoService {

	@Autowired
	 IndirizzoRepository indirizzoRepository;
	
     public Indirizzo salvaInidirzzo(Indirizzo indirizzo) {
    	 return indirizzoRepository.save(indirizzo);
     }
     
	 public Indirizzo cercaIndirizzo(Long id) {
		 return indirizzoRepository.findById(id).get();
	 }
	 
	public List<Indirizzo> cercaTuttiIndirizzi() {
		 return indirizzoRepository.findAll();
	}
}
