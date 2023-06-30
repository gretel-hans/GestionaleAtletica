package com.hans.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hans.entity.Allenatore;
import com.hans.repository.AllenatoreRepository;

@Service
public class AllenatoreService {

	@Autowired
	AllenatoreRepository aRepo;
	
	public Allenatore salvaAllenatore(Allenatore a) {
		return aRepo.save(a);
	}
	
	public List<Allenatore> cercaTuttiAllenatori(){
		return aRepo.findAll();
	}
	
	public Allenatore cercaAllenatoreConId(Long id) {
		return aRepo.findById(id).get();
	}
}
