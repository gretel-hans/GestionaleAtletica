package com.hans.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hans.entity.GaraConcorso;
import com.hans.repository.GaraConcorsoRepository;

@Service
public class GaraConcorsoService {

	@Autowired
	GaraConcorsoRepository garaConcorsoRepo;
	
	
	public GaraConcorso salvaGaraConcorso(GaraConcorso garaConcorso) {
		return garaConcorsoRepo.save(garaConcorso);
	}
	
	public List<GaraConcorso> cercaTutteGaraConcorsi(){
		return garaConcorsoRepo.findAll();
	}
	
	public GaraConcorso cercaGaraConcorsoConId(Long id) {
		return garaConcorsoRepo.findById(id).get();
	}
}
